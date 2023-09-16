const route = require('express').Router();
const salaControllers  = require('../controllers/salaController')

route.get('/professor/:matricula/:numero_sala', salaControllers.consultarSala);

route.post('/professor/:matricula', salaControllers.cadastrarSala);

route.put('/professor/:matricula/:numero_sala', salaControllers.atualizarDadosSala);

route.delete('/professor/:matricula/:numero_sala', salaControllers.deletarSala)

module.exports = route;