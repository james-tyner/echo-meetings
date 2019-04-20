const mongoose = require('mongoose');
const Meeting = mongoose.model('Meeting');

const RecapSchema = new mongoose.Schema({
  emails:[String],
  meeting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting',
    validate: {
      validator: _id => Meeting.countDocuments({ _id }).then(doc => doc > 0),
      message: 'Meeting non existent',
    }
  },
  datetime:String
}, { timestamps: true });

mongoose.model('Recap', RecapSchema);
