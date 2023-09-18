const route = require('express').Router();
const salaControllers  = require('../controllers/salaController')

route.get('/', salaControllers.listarSalas);

route.get('/professor/:matricula/:numeroSala', salaControllers.ProfessorConsultarSala);

route.post('/professor/:matricula', salaControllers.cadastrarSala);

route.put('/professor/:matricula/:numeroSala', salaControllers.atualizarDadosSala);

route.delete('/professor/:matricula/:numeroSala', salaControllers.deletarSala)

route.post('/professor/', salaControllers.cadastrarAlunoNumaSala);

route.delete('/professor', salaControllers.removerAlunoDeUmaSala);

module.exports = route;