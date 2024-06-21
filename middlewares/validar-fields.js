const { validationResult } = require('express-validator');
const { response } = require('express');

/**
 * Middleware para validar los campos de la solicitud
 * @param {Object} req - Solicitud de la petición
 * @param {Object} res - Respuesta de la petición
 * @param {Function} next - Función para pasar al siguiente middleware
 */
const validateFields = (req, res = response, next) => {
    // Manejo de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // Pasar al siguiente middleware si no hay errores
    next();
};

module.exports = {
    validateFields
};
