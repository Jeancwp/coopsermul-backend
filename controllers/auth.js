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
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

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
  const { uid, dni } = req;

  //Gnerar JWT
  const token = await generarJWT(uid, dni);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
