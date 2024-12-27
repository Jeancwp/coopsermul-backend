const { Schema, model } = require('mongoose');

const CandidatoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    require: true,
    uniqued: true,
  },
});

module.exports = model('Candidato', CandidatoSchema);
