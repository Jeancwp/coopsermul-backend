/*
    Rutas de Usuarios / auth
    host + /api/auth

*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
  crearUsuario,
  actualizarUsuario,
  loginUsuario,
  revalidarToken,
} = require('../controllers/auth');

router.post(
  '/new',
  [
    //middlewares
    check('dni', 'El DNI es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  '/:id',
  [
    //middlewares
  ],
  actualizarUsuario
);

router.post(
  '/',
  [
    //middlewares
    check('dni', 'El DNI es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
