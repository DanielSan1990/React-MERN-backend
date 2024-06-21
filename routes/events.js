const { Router } = require('express');
const { check } = require('express-validator');
const { isValidDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validar-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Todas las rutas deben pasar por la validación del JWT
router.use(validateJWT);

// Obtener eventos 
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isValidDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isValidDate),
        validateFields
    ],
    createEvent
);

// Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isValidDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isValidDate),
        validateFields
    ],
    updateEvent
);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;
