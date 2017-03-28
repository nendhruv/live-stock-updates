var express = require('express'),
  http = require('http'),
  app = module.exports = express();
  server = require('http').createServer(app);

app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index')
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
