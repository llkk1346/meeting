const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');//작업 수행 시 로깅
const morgan = require('morgan'); //작업 수행 시 로깅
const session = require('express-session'); //세션 관리를 위한
const cookieParser = require('cookie-parser'); //쿠키 파싱 미들웨어
const dotenv = require('dotenv'); //.env secret 정보 가져오기
const passport = require('passport'); //passport 미들웨어 가져오기 [ 인증을 위한 필수 모듈 ]
const passportConfig = require('./passport/index');
//const jwt = require('jsonwebtoken');
//const AuthTokenController = require('./routes/controller/authTokenController');
const indexRouter = require('./routes/index');
const router = express.Router();
const flash = require('connect-flash');

dotenv.config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));// 기본 디렉토리 경로설정.
app.set('view engine', 'ejs');// ejs 사용

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);



app.use('/', indexRouter);
app.use('/member', require('./routes/controller/member.js'));
app.use('/auth', require('./routes/controller/auth.js'));
app.use('/event', require('./routes/controller/eventController.js'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
