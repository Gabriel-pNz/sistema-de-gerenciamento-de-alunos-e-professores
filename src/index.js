const route = require('./routes/alunoRoute')
const express = require('express');
const app = express();

app.use(express.json());

app.use('/aluno', route);

app.listen(3000);



