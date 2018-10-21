const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TranslationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  transportation: {
    type: String,
    required: true
  },
  destination: {
    type: String
  },
  beforeTranslationText: {
    type: String
  },
  afterTranslationText: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Translation = mongoose.model('translation', TranslationSchema);
