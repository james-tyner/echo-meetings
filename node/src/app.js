require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// connect mongodb

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});


// models

require('./models/User');
require('./models/Team');
require('./models/Meeting');
require('./models/Task');


// express

let express = require("express");
let bodyParser = require('body-parser');

require('./config/passport-setup');

let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (err, req, res, next) {
  console.log(err);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

app.listen(3000, () => {
  console.log(`Server ${isProduction ? '(Production)' : '(Debug)'} running on port 3000`);
});
