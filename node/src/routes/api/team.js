const router = require('express').Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');

router.post("/", async (req, res) => {
  // const name = req.params['name'];
  console.log('team post');
  console.log(req.body);
  const newteam = new Team(req.body);
  newteam.save(e=>{
    if (e) {
      console.log(e);
    }
  });
  res.json(req.body);
});

router.get("/", async (req, res) => {
  Team.find({}).then((response)=> {
    res.json(response);
  });
});

module.exports = router;
