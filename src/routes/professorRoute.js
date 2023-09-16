const route = require('express').Router();
const professorController = require('../controllers/professorController')

route.get('/', professorController.listaProfessores);

route.get('/:matricula', professorController.buscarProfessor);

route.post('/', professorController.cadastrarProfessor);

route.put('/:matricula', professorController.atualizarDadosProfessor);

route.delete('/:matricula', professorController.deletarProfessor);

module.exports = route;