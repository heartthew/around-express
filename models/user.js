const mongoose = require('mongoose');

const regexUrl = /http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.(com|net|org|gov|io)(\/)?\b([-a-zA-Z0-9()@:%_+.~#?&=\/]*)(#)?/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    validate: {
      validator(v) {
        return regexUrl.test(v);
      },
      message: 'invalid url',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
