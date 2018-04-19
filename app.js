const express = require('express');
const compression = require('compression');
const app = express();

// app.use(compression());
app.use('/', express.static(__dirname + '/dist'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
app.listen((port = 4200), () => {
  console.log('listening at port ' + port);
});
