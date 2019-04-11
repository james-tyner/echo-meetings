const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
  email: String,
  code: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true });

const length = 8;
const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

InvitationSchema.statics.generateCode = function (team_name) {
  let code = team_name.replace(/ /g, "-").toLowerCase();
  for (let i = 0; i < length; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  return code;
}

mongoose.model('Invitation', InvitationSchema);
