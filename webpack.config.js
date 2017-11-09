const rimraf = require('rimraf');
rimraf('dist', () => null);

const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const {
  BaseHrefWebpackPlugin,
  SuppressExtractedTextChunksWebpackPlugin
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
  'css/light',
  'css/dark',
  'vendor',
  'main'
];
const minimizeCss = true;
const baseHref = '';
const deployUrl = '';
const postcssPlugins = function() {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: { remove: comment => !importantCommentRe.test(comment) }
  };
  return [
    postcssUrl({
      url: URL => {
        // Only convert root relative URLs, which CSS-Loader won't process into require().
        if (!URL.url.startsWith('/') || URL.url.startsWith('//')) {
          return URL.url;
        }
        if (deployUrl.match(/:\/\//)) {
          // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
          return `${deployUrl.replace(/\/$/, '')}${URL.url}`;
        } else if (baseHref.match(/:\/\//)) {
          // If baseHref contains a scheme, include it as is.
          return baseHref.replace(/\/$/, '') + `/${deployUrl}/${URL.url}`.replace(/\/\/+/g, '/');
        } else {
          // Join together base-href, deploy-url and the original URL.
          // Also dedupe multiple slashes into single ones.
          return `/${baseHref}/${deployUrl}/${URL.url}`.replace(/\/\/+/g, '/');
        }
      }
    }),
    autoprefixer(),
    customProperties({ preserve: true })
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['./node_modules', './node_modules'],
    symlinks: true,
    alias: {
      rxjs: 'rxjs/_esm2015'
    },
    mainFields: ['es2015', 'browser', 'module', 'main']
  },
  resolveLoader: {
    modules: ['./node_modules', './node_modules']
  },
  entry: {
    main: ['./src\\main.ts'],
    polyfills: ['./src\\polyfills.ts'],
    'css/common': ['./src\\themes\\common.styl'],
    'css/light': ['./src\\themes\\light.styl'],
    'css/dark': ['./src\\themes\\dark.styl']
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
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
          name: '[name].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.js$/,
        use: [
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
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.css$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssPlugins
            }
          }
        ]
      },
      {
        exclude: [
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.scss$|\.sass$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssPlugins
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        exclude: [
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.less$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssPlugins
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        exclude: [
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.styl$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssPlugins
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
        include: [
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssPlugins
              }
            }
          ],
          publicPath: ''
        })
      },
      {
        include: [
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.scss$|\.sass$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssPlugins
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                precision: 8,
                includePaths: []
              }
            }
          ],
          publicPath: ''
        })
      },
      {
        include: [
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.less$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssPlugins
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: false
              }
            }
          ],
          publicPath: ''
        })
      },
      {
        include: [
          path.join(process.cwd(), 'src\\themes\\common.styl'),
          path.join(process.cwd(), 'src\\themes\\light.styl'),
          path.join(process.cwd(), 'src\\themes\\dark.styl')
        ],
        test: /\.styl$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssPlugins
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
        ignore: ['.gitkeep'],
        debug: 'warning'
      }
    ),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false
    }),
    new HtmlWebpackPlugin({
      template: './src\\index.html',
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
      excludeChunks: ['css/dark'],
      title: 'Webpack App',
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        } else if (leftIndex < rightindex) {
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
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    }),
    new ModuleConcatenationPlugin({}),
    new UglifyJsPlugin({
      test: /\.js$/i,
      extractComments: false,
      sourceMap: false,
      cache: true,
      parallel: true,
      uglifyOptions: {
        output: {
          ascii_only: true,
          comments: false
        },
        ecma: 6,
        warnings: false,
        ie8: false,
        mangle: true,
        compress: {
          pure_getters: true,
          passes: 1
        }
      }
    }),
    new PurifyPlugin(),
    new AngularCompilerPlugin({
      mainPath: 'main.ts',
      platform: 0,
      hostReplacementPaths: {
        'environments\\environment.ts': 'environments\\environment.prod.ts'
      },
      sourceMap: false,
      tsConfigPath: 'src\\tsconfig.app.json',
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
