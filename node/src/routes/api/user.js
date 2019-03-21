const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

// return a list of tags
router.get('/', function(req, res, next) {
  User.find().then(function(result){
    return res.json(result);
  }).catch(next);
});

router.get("/:name/:password", async (req, res) => {
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

module.exports = router;
