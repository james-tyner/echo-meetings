const router = require('express').Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const User = mongoose.model('User');

router.post("/", async (req, res) => {
  // const name = req.params['name'];
  console.log('team post');
  console.log(req.body);
  const newteam = new Team(req.body);
  newteam.save(e => {
    if (e) {
      console.log(e);
    }
  });
  res.json(req.body);
});

router.get("/", async (req, res) => {
  Team.find({}).then((response) => {
    res.json(response);
  });
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
