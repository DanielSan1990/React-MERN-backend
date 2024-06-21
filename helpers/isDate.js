const moment = require('moment');

/**
 * Verificar si el valor proporcionado es una fecha válida
 * @param {any} value - El valor a verificar
 * @returns {boolean} - true si es una fecha válida, false en caso contrario
 */
const isValidDate = (value) => {
    // Verificar si el valor está definido
    if (!value) {
        return false;
    }

    // Crear un objeto moment con el valor
    const date = moment(value);

    // Verificar si el objeto moment es una fecha válida
    return date.isValid();
};

module.exports = { isValidDate };
