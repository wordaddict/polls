const express = require('express');
const path = require('path');
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const pug = require('pug');

dotenv.load();

var routes = require('../routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'sh',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'views')))

app.use('/', routes);

app.use((req, res, next) => {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
})


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
})

var port = 8000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
});
