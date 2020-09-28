const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([a-zA-z0-9%$=?/.-]+)\.([a-zA-z0-9%$=?/.-]+)?(#)?$/.test(v);
      },
      message: (props) => `${props.value} Некорректная ссылка`,
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
