import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// import logger from 'morgan';

import indexRouter from './routes/index';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const pgSession = require('connect-pg-simple')(session);

const pgStoreConfig = {
  conString: 'postgres://postgres:241299@localhost:5432/mess_app'
};
app.use(session({
  store: new pgSession(pgStoreConfig),
  secret: 'jW8aor76jpPX', // session secret
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
