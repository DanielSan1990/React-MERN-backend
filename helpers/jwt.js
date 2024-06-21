const jwt = require('jsonwebtoken');

/**
 * Generar un JWT (JSON Web Token)
 * @param {string} userId - El ID del usuario
 * @param {string} userName - El nombre del usuario
 * @returns {Promise<string>} - Una promesa que resuelve con el token generado
 */
const generateJWT = (userId, userName) => {
    return new Promise((resolve, reject) => {
        const payload = { uid: userId, name: userName };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        });
    });
};

module.exports = {
    generateJWT
};
