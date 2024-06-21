const { response } = require('express');
const Event = require('../models/Events');

/**
 * Obtener todos los eventos
 * @param {Object} req - Solicitud de obtención de eventos
 * @param {Object} res - Respuesta de la obtención de eventos
 */
const getEvents = async (req, res = response) => {
    // Buscar todos los eventos y popular el campo 'user' con el 'name'
    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    });
};

/**
 * Crear un nuevo evento
 * @param {Object} req - Solicitud de creación de evento
 * @param {Object} res - Respuesta de la creación de evento
 */
const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        // Asignar el usuario al evento
        event.user = req.uid;

        // Guardar el evento en la base de datos
        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

/**
 * Actualizar un evento existente
 * @param {Object} req - Solicitud de actualización de evento
 * @param {Object} res - Respuesta de la actualización de evento
 */
const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        // Buscar el evento por ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // Verificar si el usuario tiene privilegio de editar el evento
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        // Crear un objeto con los nuevos datos del evento
        const updatedEvent = {
            ...req.body,
            user: uid
        };

        // Actualizar el evento en la base de datos
        const eventUpdated = await Event.findByIdAndUpdate(eventId, updatedEvent, { new: true });

        res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

/**
 * Eliminar un evento existente
 * @param {Object} req - Solicitud de eliminación de evento
 * @param {Object} res - Respuesta de la eliminación de evento
 */
const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        // Buscar el evento por ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // Verificar si el usuario tiene privilegio de eliminar el evento
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        // Eliminar el evento de la base de datos
        await Event.findByIdAndDelete(eventId);

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
