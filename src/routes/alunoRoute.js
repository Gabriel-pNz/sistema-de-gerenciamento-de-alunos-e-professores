const route = require('express').Router();
const alunoController = require('../controllers/alunoController');

route.get('/', alunoController.listaAlunos);

route.get('/:matricula', alunoController.alunoConsultarSala);

route.get('/:matricula', alunoController.buscarAluno);

route.post('/', alunoController.cadastrarAluno);

route.put('/:matricula', alunoController.atualizarDadosAluno);

route.delete('/:matricula', alunoController.deletarAluno);

module.exports = route;