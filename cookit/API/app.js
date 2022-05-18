var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
const port = 3001

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var recipesRouter = require('./routes/recipes');
var app = express();

// view engine 
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;