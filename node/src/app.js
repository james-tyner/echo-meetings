require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

const log = require('./util/log');

const isProduction = process.env.NODE_ENV === 'production';
const mongo_url = process.env.MONGO_URL;

if (mongo_url == null || mongo_url === '') {
  log.error('MONGO_URL missing. Did you create a .env file?');
  process.exit(1);
}


// SEND GRID API

const sengrid_key = process.env.SENDGRID_API_KEY;

if (sengrid_key == null || sengrid_key === '') {
  log.error('SENDGRID_API_KEY missing. Did you update your .env file?');
  process.exit(1);
}

sgMail.setApiKey(sengrid_key);


// connect mongodb

mongoose.connect(mongo_url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (err) => {
  log.error(err);
});
db.once('open', () => {
  log.log('Connected to MongoDB');
});


// models

require('./models/User');
require('./models/Team');
require('./models/Meeting');
require('./models/Task');
require('./models/Invitation');
require('./models/Recap');

// express

require('./config/passport-setup');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

app.use((req, res, next) => {
  log.log(`${req.method} ${req.path}`);
  next();
});


app.use(require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use((err, req, res, next) => {
  if (err.message === 'Not Found' || err.message === 'No authorization token was found') {
    log.error(err.message);
  } else {
    log.error(err.stack);
  }
  next(err);
});


// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(3000, () => {
  log.log(`Server ${isProduction ? '(Production)' : '(Debug)'} running on port 3000`);
});
