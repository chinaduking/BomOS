var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var domain = require('domain');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var secret = 'duking';

var index = require('./routes/index');
var api = require('./routes/users');

var app = express();

//jwt
app.set('jwtTokenSecret',secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    req.models = app.get('models');
    next();
});

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('err.................11')
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// //引入一个domain的中间件，将每一个请求都包裹在一个独立的domain中
// //domain来处理异常
// app.use(function (req,res, next) {
//     var d = domain.create();
//     console.log('err.................')
//     //监听domain的错误事件
//     d.on('error', function (err) {
//         logger.error(err);
//         res.statusCode = 500;
//         res.json({sucess:false, messag: '服务器异常'});
//         d.dispose();
//     });
//
//     d.add(req);
//     d.add(res);
//     d.run(next);
// });

module.exports = app;
