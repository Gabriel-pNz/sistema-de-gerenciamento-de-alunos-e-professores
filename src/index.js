const { readFile, writeFile } = require('./utils/fileUtils');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/aluno', async(req, res) => {

    const listaAlunos = await readFile('./src/dataBase/alunosData.json', 'utf-8');

    res.status(200).json(listaAlunos)
})

app.get('/aluno/:matricula', async(req, res) => {

    try {
        const { matricula } = req.params;

        const listaAlunos = await readFile('./src/dataBase/alunosData.json', 'utf-8');

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        } 

        const matriculaNaoEncontrada = listaAlunos.alunos.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        }

        const aluno = listaAlunos.alunos.find((item) => {
            return item.matricula === matricula;
        })

        res.status(200).json(aluno)
    } catch (error) {
        res.status(error.status || 500).json({mensagem:error.mensagem})
    }
 
})

app.post('/aluno', async(req, res) => {

    try {
        
        const { nome, email, matricula, data_nascimento } = req.body;

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        } 

        const listaAlunos = await readFile('./src/dataBase/alunosData.json', 'utf-8')
        
        const matriculaEncontrada = listaAlunos.alunos.find((item) => {
            return item.matricula === matricula;
        })
        
        if (matriculaEncontrada) {
            throw { status: 400, mensagem: "Matricula já cadastrada!" };
        }

        listaAlunos.alunos.push({
            nome,
            email,
            matricula,
            data_nascimento
        })

        await writeFile('./src/dataBase/alunosData.json', listaAlunos);

        res.status(201).json()
        
    } catch (error) {
        res.status(error.status || 500).json({erro: error.mensagem})
    }
    
})

app.put('/aluno/:matricula', async(req, res) => {

    try {
        
        const { matricula } = req.params;

        const { nome, email, data_nascimento } = req.body;

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        } 

        const listaAlunos = await readFile('./src/dataBase/alunosData.json')

        const matriculaNaoEncontrada = listaAlunos.alunos.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        }

        const aluno = listaAlunos.alunos.find((item) => {
            return item.matricula === matricula;
        })

        aluno.nome = nome;
        aluno.email = email;
        aluno.data_nascimento = data_nascimento;

        await writeFile('./src/dataBase/alunosData.json', listaAlunos)

        res.status(200).send()

    } catch (error) {
        res.status(error.status || 500).json({erro: error.mensagem})
    }

});

app.delete('/aluno/:matricula', async(req, res) => {

    try {

        const { matricula } = req.params;

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        }

        const listaAlunos = await readFile('./src/dataBase/alunosData.json')

        const matriculaNaoEncontrada = listaAlunos.alunos.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        }

        const aluno = listaAlunos.alunos.find((item) => {
            return item.matricula === matricula;
        })

        const listaAlunosAtualizada = listaAlunos.alunos.filter((item) => {
            return item !== aluno;
        })

        listaAlunos.alunos = listaAlunosAtualizada;

        await writeFile('./src/dataBase/alunosData.json', listaAlunos, 'utf-8');

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({erro:error.mensagem});
    }   

})

app.listen(3000);



