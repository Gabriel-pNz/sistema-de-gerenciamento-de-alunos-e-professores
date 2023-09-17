const { readFile, writeFile } = require('../utils/fileUtils');

const listaAlunos = async (req, res) => {

    const listaAlunos = await readFile('./src/dataBase/alunosData.json', 'utf-8');
    res.status(200).json(listaAlunos)
};

const alunoConsultarSala = async (req, res) => {

    try {

        const { matricula } = req.params;

        if (matricula.includes(" ") ) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        }

        const listaAlunos = await readFile('./src/dataBase/alunosData.json', 'utf-8');

        const matriculaNaoEncontrada = listaAlunos.alunos.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 404, mensagem: "Matricula não encontrada!" };
        }

        const listaSalas = await readFile('./src/dataBase/salasData.json');

        const salas = listaSalas.salas.filter((item) => {
            return item;
        });

        const salasAluno = []
        
        for (const sala of salas) {
            const aluno = sala.alunos.find((item) => {
                return item.matricula === matricula;
            });

            if(aluno) {
        
                salasAluno.push(sala.numeroSala)
            }
            
        }

        if(salasAluno.length === 0) {
            throw { status: 404, mensagem: "Aluno não está cadastrado em nenhuma sala!" };
        }

        res.status(200).json(salasAluno);

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem })
    }

}

const buscarAluno = async (req, res) => {

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
            throw { status: 404, mensagem: "Matricula não encontrada!" };
        }

        const aluno = listaAlunos.alunos.find((item) => {
            return item.matricula === matricula;
        })

        res.status(200).json(aluno)
    } catch (error) {
        res.status(error.status || 500).json({ mensagem: error.mensagem })
    }

};

const cadastrarAluno = async (req, res) => {

    try {

        const { nome, email, matricula, dataNascimento } = req.body;

        if (matricula.includes(" ") || nome.includes(" ") || email.includes(" ") || dataNascimento.includes(" ")) {
            throw { status: 400, mensagem: "Dado(s) inválido(s)!" };
        }

        const listaAlunos = await readFile('./src/dataBase/alunosData.json', 'utf-8')

        const matriculaEncontrada = listaAlunos.alunos.find((item) => {
            return item.matricula === matricula;
        })

        if (matriculaEncontrada) {
            throw { status: 409, mensagem: "Matricula já cadastrada!" };
        }

        listaAlunos.alunos.push({
            nome,
            email,
            matricula,
            dataNascimento
        })

        await writeFile('./src/dataBase/alunosData.json', listaAlunos);

        res.status(201).json()

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem })
    }

};

const atualizarDadosAluno = async (req, res) => {

    try {

        const { matricula } = req.params;

        const { nome, email, dataNascimento } = req.body;

        if(matricula.includes(" ") || email.includes(" ") || dataNascimento.includes(" ")) {
            throw { status: 400, mensagem: "Dado(s) inválido(s)!" };
        }

        const listaAlunos = await readFile('./src/dataBase/alunosData.json')

        const matriculaNaoEncontrada = listaAlunos.alunos.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 404, mensagem: "Matricula não encontrada!" };
        }

        const aluno = listaAlunos.alunos.find((item) => {
            return item.matricula === matricula;
        })

        aluno.nome = nome;
        aluno.email = email;
        aluno.dataNascimento = dataNascimento;

        await writeFile('./src/dataBase/alunosData.json', listaAlunos)

        res.status(200).send()

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem })
    }

};

const deletarAluno = async (req, res) => {

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
            throw { status: 404, mensagem: "Matricula não encontrada!" };
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
        res.status(error.status || 500).json({ erro: error.mensagem });
    }

};

module.exports = {
    listaAlunos,
    alunoConsultarSala,
    buscarAluno,
    cadastrarAluno,
    atualizarDadosAluno,
    deletarAluno
}