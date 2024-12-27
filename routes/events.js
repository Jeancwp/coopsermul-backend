/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events');

router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post('/', crearEvento);

//Actualizar un nuevo evento
router.put('/:id', actualizarEvento);

//Eliminar un nuevo evento
router.delete('/:id', eliminarEvento);

module.exports = router;
