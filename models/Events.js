const { Schema, model } = require('mongoose');

// Definir el esquema para el modelo de Evento
const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Método para modificar la representación JSON del esquema
EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;  // Cambiar _id por id en la representación JSON
    return object;
});

module.exports = model('Event', EventSchema);
