const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

/**
 * Crear un nuevo usuario
 */
const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        const newUser = new User(req.body);

        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        const token = await generateJWT(newUser.id, newUser.name);

        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

/**
 * Iniciar sesión del usuario
 */
const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

/**
 * Revalidar y generar un nuevo token
 */
const renewToken = async (req, res = response) => {
    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};

module.exports = {
    createUser,
    loginUser,
    renewToken
};
