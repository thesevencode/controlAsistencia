const express = require('express');
const router = express.Router();

const asistencia = require('../controllers/asistencia');

module.exports = async function() {

    let controller = await asistencia()

    router
        .get('/', controller.index)
        .get('/listar', controller.findAll)
        // .get('/add', home.index)
        .post('/', controller.create)
        // .put('/')
        // .delete('/')

    return router
}