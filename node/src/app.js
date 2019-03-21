
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
const User = mongoose.model('User');
const Team = mongoose.model('Team');


// express

let express = require("express");
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/user/:name/:password", async (req, res) => {
  const newuser = new User({
    name: req.params['name'],
    password: req.params['password']
  });
  newuser.save(function (e) {
    if (e) {
      console.log(e);
    }
  });
  res.json('success');
});

app.post("/team", async (req, res) => {
  // const name = req.params['name'];
  console.log('team post');
  console.log(req.body);
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
