const { response } = require('express');
const Candidato = require('../models/Candidato'); // Importación directa

const getCandidatos = async (req, res = response) => {
  try {
    const candidatos = await Candidato.find(); // Consulta a la colección de MongoDB

    res.json({
      ok: true,
      candidatos,
    });
  } catch (error) {
    console.error('Error al obtener candidatos:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener candidatos, contacte al administrador',
    });
  }
};

module.exports = {
  getCandidatos,
};