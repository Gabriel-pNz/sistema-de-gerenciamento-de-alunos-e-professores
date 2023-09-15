const express = require('express');
const { readFile, writeFile } = require('./utils/fileUtils');
const app = express();

app.use(express.json());

app.post('/aluno', async(req, res) => {

    const { nome, email, matricula, data_nascimento} = req.body;

    const alunosLista = await readFile('./src/dataBase/alunosData.json')

    alunosLista.alunos.push({
        nome,
        email,
        matricula,
        data_nascimento
    })
    
    await writeFile('./src/dataBase/alunosData.json', alunosLista);
    res.status(201).send()
    
})

app.listen(3000);



