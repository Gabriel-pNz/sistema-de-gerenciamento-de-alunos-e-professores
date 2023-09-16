const { readFile, writeFile } = require('../utils/fileUtils');

const listaProfessores = async (req, res) => {

    const listaProfessores = await readFile('./src/dataBase/professoresData.json', 'utf-8');

    res.status(200).json(listaProfessores)
};

const buscarProfessor = async (req, res) => {

    try {
        const { matricula } = req.params;

        const listaProfessores = await readFile('./src/dataBase/professoresData.json', 'utf-8');

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        }

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        }

        const professor = listaProfessores.professores.find((item) => {
            return item.matricula === matricula;
        })

        res.status(200).json(professor)
    } catch (error) {
        res.status(error.status || 500).json({ mensagem: error.mensagem })
    }

};

const cadastrarProfessor = async (req, res) => {

    try {

        const { nome, email, matricula, data_nascimento } = req.body;

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json', 'utf-8')

        const matriculaEncontrada = listaProfessores.professores.find((item) => {
            return item.matricula === matricula;
        })

        if (matriculaEncontrada) {
            throw { status: 400, mensagem: "Matricula já cadastrada!" };
        }

        listaProfessores.professores.push({
            nome,
            email,
            matricula,
            data_nascimento
        })

        await writeFile('./src/dataBase/professoresData.json', listaProfessores);

        res.status(201).json()

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem })
    }

};

const atualizarDadosProfessor = async (req, res) => {

    try {

        const { matricula } = req.params;

        const { nome, email, data_nascimento } = req.body;

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula;
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        };

        const professor = listaProfessores.professores.find((item) => {
            return item.matricula === matricula;
        });

        professor.nome = nome;
        professor.email = email;
        professor.data_nascimento = data_nascimento;

        await writeFile('./src/dataBase/professoresData.json', listaProfessores);

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

const deletarProfessor = async (req, res) => {

    try {

        const { matricula } = req.params;

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        };

        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        };

        const professor = listaProfessores.professores.find((item) => {
            return item.matricula === matricula;
        });

        const listaProfessoresAtualizada = listaProfessores.professores.filter((item) => {
            return item !== professor;
        });

        listaProfessores.professores = listaProfessoresAtualizada;

        await writeFile('./src/dataBase/professoresData.json', listaProfessores, 'utf-8');

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

module.exports = {
    listaProfessores,
    buscarProfessor,
    cadastrarProfessor,
    atualizarDadosProfessor,
    deletarProfessor
};