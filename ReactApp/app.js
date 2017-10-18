var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var nrc = require('node-run-cmd');
// var cmd=require('node-cmd');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1', require('./router'));
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// console.log('near nrc--------------------------------------------------');
// console.log('cmd is here----------------------------');
// // cmd.run('mkdir parent', function(err,data){
// //   console.log('i m here');
// // });
// // cmd.run('mkdir parents',function(err,data){
// //   cmd.run('cd parents',function(err,d){
// //     cmd.run('mkdir childfile')
// //   } );
// // } );
// cmd.get(
//         'mkdir fas12223425'+ '&& cd fas12223425'+ '&& cd ..'+ '&& mkdir sec',
//         function(err, data, stderr){
//             if (!err) {
//                console.log('file created');
//             } else {
//                console.log('error', err)
//             }
//
//         }
//     );



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// app.post('/api/v1/createDB',function(req,res){

// 	console.log('createDB in server');
// 	console.log(req.body);
// });

// router.get('/', function(req, res) {
//  res.json({ message: 'API Initialized!'});
// });
// //Use our rouer configuration when we call /api
// app.use('/api', router);
































module.exports = app;
