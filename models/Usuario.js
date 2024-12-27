const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    require: true,
    uniqued: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  is_voted: {
    type: Boolean,
    default: false,
  },
  is_candidate: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Usuario', UsuarioSchema);
