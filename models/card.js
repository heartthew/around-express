const mongoose = require('mongoose');

const regexUrl = /http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.(com|net|org|gov|io)(\/)?\b([-a-zA-Z0-9()@:%_+.~#?&=\/]*)(#)?/i;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regexUrl.test(v);
      },
      message: 'invalid url',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
