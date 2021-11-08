const mongoose = require('mongoose');

const regexUrl = /http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.(com|net|org|gov|io)(\/)?\b([-a-zA-Z0-9()@:%_+.~#?&=\/]*)#/gi;
const regexName = /[a-zA-Z]{2, 40}/;
const regexAbout = /[a-zA-Z0-9]{2, 200}/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
    validate: {
      validator(v) {
        return regexName.test(v);
      },
      message: 'invalid name',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    validate: {
      validator(v) {
        return regexAbout.test(v);
      },
      message: 'invalid information',
    },
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
