const routeAluno = require('./routes/alunoRoute')
const routeProfessor = require('./routes/professorRoute')
const routeSala = require('./routes/salaRoutes')

const express = require('express');
const app = express();

app.use(express.json());

app.use('/aluno', routeAluno);

app.use('/professor', routeProfessor)

app.use('/sala', routeSala);

app.listen(3000);



