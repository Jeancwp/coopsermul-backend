/*
    Candidatos Routes
    /api/candidatos
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { getCandidatos } = require('../controllers/candidatos');

router.use(validarJWT);

//Obtener eventos
router.get('/', getCandidatos);

module.exports = router;
