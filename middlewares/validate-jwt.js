const { response } = require('express');
const jwt = require('jsonwebtoken');

/**
 * Middleware para validar el JWT (JSON Web Token)
 * @param {Object} req - Solicitud de la petición
 * @param {Object} res - Respuesta de la petición
 * @param {Function} next - Función para pasar al siguiente middleware
 */
const validateJWT = (req, res = response, next) => {
    // Obtener el token de los encabezados
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        // Verificar el token
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Añadir la información del usuario al objeto de la solicitud
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    // Pasar al siguiente middleware si el token es válido
    next();
};

module.exports = {
    validateJWT
};
