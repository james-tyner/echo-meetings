// connect mongodb

let mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo success');
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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('./routes'));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
