const {readFile, writeFile} = require('../utils/fileUtils');

const consultarSala = async (req, res) => {

    try {

        const { matricula, numero_sala } = req.params;

        if (matricula.includes(" ") || numero_sala.includes(" ")) {
            throw { status: 400, mensagem: "Matricula ou número da sala inválidos!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json', 'utf-8')

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json');

        const salaNaoEncontrada = listaSalas.salas.every((item) => {
            return item.numero_sala !== numero_sala;
        });

        if (salaNaoEncontrada) {
            throw { status: 400, mensagem: "Sala não encontrada!" };
        };

        const sala = listaSalas.salas.find((item) => {
            return item.numero_sala === numero_sala
        })

        res.status(200).json(sala);

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem })
    }

}

const cadastrarSala = async (req, res) => {

    try {

        const { matricula } = req.params;
        const { numero_sala, capacidade_alunos, disponibilidade } = req.body;

        if (matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula inválida!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json', 'utf-8')

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json', 'utf-8')

        listaSalas.salas.push({
            numero_sala,
            capacidade_alunos,
            disponibilidade,
        })

        await writeFile('./src/dataBase/salasData.json', listaSalas);

        res.status(201).json()

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem })
    }

};

const atualizarDadosSala = async (req, res) => {

    try {

        const { matricula, numero_sala } = req.params;

        const { capacidade_alunos, disponibilidade } = req.body;

        if (matricula.includes(" ") || numero_sala.includes(" ")) {
            throw { status: 400, mensagem: "Matricula ou número da sala inválidos!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula;
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json');

        const salaNaoEncontrada = listaSalas.salas.every((item) => {
            return item.numero_sala !== numero_sala;
        });

        if (salaNaoEncontrada) {
            throw { status: 400, mensagem: "Sala não encontrada!" };
        };

        const sala = listaSalas.salas.find((item) => {
            return item.numero_sala === numero_sala;
        });

        sala.capacidade_alunos = capacidade_alunos;
        sala.disponibilidade = disponibilidade;

        await writeFile('./src/dataBase/salasData.json', listaSalas);

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

const deletarSala = async (req, res) => {

    try {

        const { matricula, numero_sala } = req.params;

        if (matricula.includes(" ") || numero_sala.includes(" ")) {
            throw { status: 400, mensagem: "Matricula ou número da sala inválidos!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula;
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json');

        const salaNaoEncontrada = listaSalas.salas.every((item) => {
            return item.numero_sala !== numero_sala;
        });

        if (salaNaoEncontrada) {
            throw { status: 400, mensagem: "Sala não encontrada!" };
        };

        const sala = listaSalas.salas.find((item) => {
            return item.numero_sala === numero_sala;
        });

        const salasAtualizadas = listaSalas.salas.filter((item) => {
            return item !== sala;
        })

        listaSalas.salas = salasAtualizadas;

        await writeFile('./src/dataBase/salasData.json', listaSalas);

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

module.exports = {
    consultarSala,
    cadastrarSala,
    atualizarDadosSala,
    deletarSala
}