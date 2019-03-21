let express = require("express");
let mongoose = require('mongoose');
require('dotenv').config();

// connect mongodb
mongoose.connect(process.env.MONGO_URL);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo success');
});

// models
require('./models/User');
const User = mongoose.model('User');

// express
let app = express();

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
  res.json(req.params['name'] + " " + req.params['password']);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
