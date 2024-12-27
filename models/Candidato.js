const { Schema, model } = require('mongoose');

const CandidatoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  sede: {
    type: String,
    required: true,
  },
});

module.exports = model('Candidato', CandidatoSchema);
