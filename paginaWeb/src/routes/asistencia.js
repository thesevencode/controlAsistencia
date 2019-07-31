const express = require('express');
const router = express.Router();

const asistencia = require('../controllers/asistencia');

module.exports = async function() {

    let controller = await asistencia()

    router
        .get('/', controller.index)
        .get('/dni/:dni', controller.findByDni)
        .get('/listar', controller.findAll)
        .post('/', controller.create)
        .post('/assistance', controller.addAssistanceByDni)

    return router
}