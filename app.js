const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/dist'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
app.listen((port = 4200), () => {
  console.log('listening at port ' + port);
});
