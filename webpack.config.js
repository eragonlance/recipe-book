const rimraf = require('rimraf');
rimraf('dist', () => null);

const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractTextPluginHash = new ExtractTextPlugin({
  filename: '[name].[contenthash:20].bundle.css'
});
const extractTextPluginNoHash = new ExtractTextPlugin({ filename: '[name].bundle.css' });
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const postcssImports = require('postcss-import');

const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const {
  BaseHrefWebpackPlugin,
  SuppressExtractedTextChunksWebpackPlugin,
  CleanCssWebpackPlugin,
  BundleBudgetPlugin,
  PostcssCliResources
} = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, ModuleConcatenationPlugin } = require('webpack').optimize;
const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = [
  'inline',
  'polyfills',
  'sw-register',
  'css/common',
  'css/deeppurpleAmber',
  'css/purpleGreen',
  'vendor',
  'main'
];
const hashFormat = {
  chunk: '.[chunkhash:20]',
  extract: '.[contenthash:20]',
  file: '.[hash:20]',
  script: '.[hash:20]'
};
const baseHref = '';
const deployUrl = '';
const projectRoot = process.cwd();
const maximumInlineSize = 10;
const postcssPlugins = function(loader) {
  return [
    postcssImports({
      resolve: (url, context) => {
        return new Promise((resolve, reject) => {
          let hadTilde = false;
          if (url && url.startsWith('~')) {
            url = url.substr(1);
            hadTilde = true;
          }
          loader.resolve(context, (hadTilde ? '' : './') + url, (err, result) => {
            if (err) {
              if (hadTilde) {
                reject(err);
                return;
              }
              loader.resolve(context, url, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            } else {
              resolve(result);
            }
          });
        });
      },
      load: filename => {
        return new Promise((resolve, reject) => {
          loader.fs.readFile(filename, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            const content = data.toString();
            resolve(content);
          });
        });
      }
    }),
    postcssUrl({
      filter: ({ url }) => url.startsWith('~'),
      url: ({ url }) => {
        const fullPath = path.join(projectRoot, 'node_modules', url.substr(1));
        return path.relative(loader.context, fullPath).replace(/\\/g, '/');
      }
    }),
    postcssUrl([
      {
        // Only convert root relative URLs, which CSS-Loader won't process into require().
        filter: ({ url }) => url.startsWith('/') && !url.startsWith('//'),
        url: ({ url }) => {
          if (deployUrl.match(/:\/\//) || deployUrl.startsWith('/')) {
            // If deployUrl is absolute or root relative, ignore baseHref & use deployUrl as is.
            return `${deployUrl.replace(/\/$/, '')}${url}`;
          } else if (baseHref.match(/:\/\//)) {
            // If baseHref contains a scheme, include it as is.
            return baseHref.replace(/\/$/, '') + `/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
          } else {
            // Join together base-href, deploy-url and the original URL.
            // Also dedupe multiple slashes into single ones.
            return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
          }
        }
      },
      {
        // TODO: inline .cur if not supporting IE (use browserslist to check)
        filter: asset => {
          return maximumInlineSize > 0 && !asset.hash && !asset.absolutePath.endsWith('.cur');
        },
        url: 'inline',
        // NOTE: maxSize is in KB
        maxSize: maximumInlineSize,
        fallback: 'rebase'
      },
      { url: 'rebase' }
    ]),
    PostcssCliResources({
      deployUrl: loader.loaders[loader.loaderIndex].options.ident == 'extracted' ? '' : deployUrl,
      loader,
      filename: `[name]${hashFormat.file}.[ext]`
    }),
    autoprefixer({ grid: true })
  ];
};

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: true,
    modules: ['./src', './node_modules'],
    alias: rxPaths(),
    mainFields: ['es2015', 'browser', 'module', 'main']
  },
  resolveLoader: {
    modules: ['./node_modules', './node_modules/@angular/cli/node_modules'],
    alias: rxPaths()
  },
  entry: {
    main: ['./src/main.ts'],
    polyfills: ['./src/polyfills.ts'],
    'css/common': ['./src/themes/common.styl'],
    'css/deeppurpleAmber': [
      './node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css'
    ],
    'css/purpleGreen': ['./node_modules/@angular/material/prebuilt-themes/purple-green.css']
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'js/[name].[chunkhash:20].bundle.js',
    chunkFilename: 'js/[id].[chunkhash:20].chunk.js',
    crossOriginLoading: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory:
                '/home/tuan/Documents/practice/recipe-book/node_modules/@angular-devkit/build-optimizer/src/.cache'
            }
          },
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        exclude: [
          path.join(process.cwd(), 'src/themes/common.styl'),
          path.join(
            process.cwd(),
            'node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css'
          ),
          path.join(
            process.cwd(),
            'node_modules/@angular/material/prebuilt-themes/purple-green.css'
          )
        ],
        test: /\.css$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: false
            }
          }
        ]
      },
      {
        exclude: [path.join(process.cwd(), 'src/themes/')],
        test: /\.styl$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: false,
              paths: []
            }
          }
        ]
      },
      {
        include: [path.join(process.cwd(), 'src/themes/common.styl')],
        loaders: extractTextPluginHash.extract({
          use: [
            {
              loader: 'raw-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'extracted',
                plugins: postcssPlugins,
                sourceMap: false
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: false,
                paths: []
              }
            }
          ],
          publicPath: ''
        })
      },
      {
        include: [
          path.join(
            process.cwd(),
            'node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css'
          ),
          path.join(
            process.cwd(),
            'node_modules/@angular/material/prebuilt-themes/purple-green.css'
          )
        ],
        loaders: extractTextPluginNoHash.extract({
          use: [
            {
              loader: 'raw-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'extracted',
                plugins: postcssPlugins,
                sourceMap: false
              }
            }
          ],
          publicPath: ''
        })
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          },
          '@ngtools/webpack'
        ]
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [
        {
          context: 'src',
          to: '',
          from: {
            glob: 'assets/**/*',
            dot: true
          }
        },
        {
          context: 'src',
          to: '',
          from: {
            glob: 'favicon.png',
            dot: true
          }
        }
      ],
      {
        ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
        debug: 'warning'
      }
    ),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: projectRoot
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        keepClosingSlash: true
      },
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: ['css/purpleGreen'],
      title: 'Webpack App',
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightIndex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightIndex) {
          return 1;
        } else if (leftIndex < rightIndex) {
          return -1;
        } else {
          return 0;
        }
      }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      name: ['inline'],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: ['main'],
      minChunks: 2,
      async: 'common'
    }),
    extractTextPluginHash,
    extractTextPluginNoHash,
    new SuppressExtractedTextChunksWebpackPlugin(),
    new CleanCssWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    }),
    new ModuleConcatenationPlugin({}),
    new BundleBudgetPlugin({}),
    new PurifyPlugin(),
    new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i,
      extractComments: false,
      sourceMap: false,
      cache: true,
      parallel: true,
      uglifyOptions: {
        output: {
          ascii_only: true,
          comments: false,
          webkit: true
        },
        ecma: 6,
        warnings: false,
        ie8: false,
        mangle: {
          safari10: true
        },
        compress: {
          typeofs: false,
          inline: 1,
          pure_getters: true,
          passes: 3
        }
      }
    }),
    new AngularCompilerPlugin({
      mainPath: 'main.ts',
      platform: 0,
      hostReplacementPaths: {
        'environments/environment.ts': 'environments/environment.prod.ts'
      },
      sourceMap: false,
      tsConfigPath: 'src/tsconfig.app.json',
      exclude: ['**/*.spec.ts'],
      compilerOptions: {}
    })
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  devServer: {
    historyApiFallback: true
  }
};
