const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { name, dni, password, phone, email, is_voted, is_candidate } =
    req.body;

  try {
    let usuario = await Usuario.findOne({ dni });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese DNI',
      });
    }

    usuario = new Usuario(req.body);

    //Encriptar contraseña
    //const salt = bcrypt.genSaltSync();
    //usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Gnerar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.dni);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      dni: usuario.dni,
      is_voted: usuario.is_voted,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const actualizarUsuario = async (req, res = response) => { 
  const uid = req.params.id;
  try {
    // Verificar si el usuario existe
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario por ese ID',
      });
    }

    // Actualizar solo el campo is_voted
    const { is_voted } = req.body; // Recibir el valor de is_voted desde el cuerpo de la petición

    if (typeof is_voted !== 'boolean') {
      return res.status(400).json({
        ok: false,
        msg: 'El campo is_voted debe ser un valor booleano (true o false)',
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      uid,
      { is_voted },
      { new: true } // Retornar el documento actualizado
    );

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
}

const loginUsuario = async (req, res = response) => {
  const { dni, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ dni });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario NO existe con ese DNI',
      });
    }

    //Confirmar password
    //const validPassword = bcrypt.compareSync(password, usuario.password)
    if (password !== usuario.password) {
      return res.status(400).json({
        ok: false,
        msg: 'Password Incorrecto',
      });
    }

    //Gnerar JWT
    const token = await generarJWT(usuario.id, usuario.dni);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      dni: usuario.dni,
      is_voted: usuario.is_voted,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, dni, name } = req;

  try {
    // Buscar al usuario en la base de datos por su `uid`
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado',
      });
    }

    // Generar un nuevo JWT
    const token = await generarJWT(uid, dni);

    // Responder con los datos del usuario, incluyendo is_voted
    res.json({
      ok: true,
      uid: usuario.id,
      dni: usuario.dni,
      name: usuario.name,
      is_voted: usuario.is_voted, // Tomar el valor desde la base de datos
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

module.exports = {
  crearUsuario,
  actualizarUsuario,
  loginUsuario,
  revalidarToken,
};
