const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
  dni_user: {
    type: String,
    required: true,
  },
  dni_candidato: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    unique: true,
  },
});

EventoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Evento', EventoSchema);
