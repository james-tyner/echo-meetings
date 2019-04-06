const log = require('../../util/log')
const router = require('express').Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const User = mongoose.model('User');
const auth = require('../auth');

router.post("/", async (req, res) => {
  // const name = req.params['name'];
  log.log('Creating a team post');
  log.log(req.body);
  const newteam = new Team(req.body);
  newteam.save(e => {
    if (e) {
      console.log(e);
    }
  });
  res.json(req.body);
});

router.get("/", auth.required, async (req, res) => {
  User.findById(req.payload.id).then(function (user) {
    console.log(user.id);
    Team.find({members: user.id}).then((response) => {
      res.json(response);
    });
  })
});

router.get("/:t_id/users", async (req, res) => {
  try{
    let result = [];
    const response = await Team.findById(req.params['t_id']);
    for (const u_id of response['members']) {
      const u_response = await User.findById(u_id);
      result.push(u_response['name']);
    }
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
  }

});

module.exports = router;
