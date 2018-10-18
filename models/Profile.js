const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  country: {
    type: String,
    require: true
  },
  mothertongue: {
    type: String
  },
  neareststation: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
