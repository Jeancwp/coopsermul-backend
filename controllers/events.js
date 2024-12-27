const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
  const evetos = await Evento.find().populate('user', 'name dni');

  res.json({
    ok: true,
    evetos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    evento.dni_user = req.dni;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const actualizarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizarEvento',
  });
};

const eliminarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'eliminarEvento',
  });
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
