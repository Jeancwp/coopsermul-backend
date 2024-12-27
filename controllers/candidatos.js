const { response } = require('express');

const getCandidatos = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getCandidatos',
  });
};

module.exports = {
  getCandidatos,
};
