const routeAluno = require('./routes/alunoRoute')
const routeProfessor = require('./routes/professorRoute')
const express = require('express');
const app = express();

app.use(express.json());

app.use('/aluno', routeAluno);

app.use('/professor', routeProfessor)

app.listen(3000);



