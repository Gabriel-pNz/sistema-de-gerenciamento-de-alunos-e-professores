const route = require('express').Router();
const salaControllers  = require('../controllers/salaController')

route.get('/', salaControllers.listarSalas);

route.get('/professor/:matricula/:numero_sala', salaControllers.ProfessorConsultarSala);

route.post('/professor/:matricula', salaControllers.cadastrarSala);

route.put('/professor/:matricula/:numero_sala', salaControllers.atualizarDadosSala);

route.delete('/professor/:matricula/:numero_sala', salaControllers.deletarSala)

route.post('/professor', salaControllers.cadastrarAlunoNumaSala);

route.delete('/professor', salaControllers.removerAlunoDeUmaSala);

module.exports = route;