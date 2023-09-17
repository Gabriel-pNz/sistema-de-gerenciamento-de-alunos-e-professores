const {readFile, writeFile} = require('../utils/fileUtils');

const listarSalas = async(req, res) => {

    try {

        const listaSalas = await readFile('./src/dataBase/salasData.json');
        res.status(200).json(listaSalas);

    } catch (error) {
        res.status(500).json({ erro: error.mensagem })
    }
}

const ProfessorConsultarSala = async (req, res) => {

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
        const { numero_sala, capacidade_alunos, disponibilidade} = req.body;

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

        const listaSalas = await readFile('./src/dataBase/salasData.json', 'utf-8');

        listaSalas.salas.push({
            numero_sala,
            capacidade_alunos,
            disponibilidade,
            alunos:[]
        })

        await writeFile('./src/dataBase/salasData.json', listaSalas, 'utf-8');

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

        const listaSalas = await readFile('./src/dataBase/salasData.json', 'utf-8');

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

        await writeFile('./src/dataBase/salasData.json', listaSalas, 'utf-8');

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

        await writeFile('./src/dataBase/salasData.json', listaSalas, 'utf-8');

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

const cadastrarAlunoNumaSala = async(req, res) => {

    try {

        const { matriculaProfessor, matriculaAluno, numeroSala} = req.body;
        
        if (matriculaProfessor.includes(" ") || numeroSala.includes(" ")) {
            throw { status: 400, mensagem: "Matricula ou número da sala inválidos!" };
        }
        
        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matriculaProfessor;
        });

        if (matriculaNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula professor não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json');

        const salaNaoEncontrada = listaSalas.salas.every((item) => {
            return item.numero_sala !== numeroSala;
        });
    
        if (salaNaoEncontrada) {
            throw { status: 400, mensagem: "Sala não encontrada!" };
        };

        const listaAlunos = await readFile('./src/dataBase/alunosData.json');

        const matriculaAlunoNaoEncontrada = listaAlunos.alunos.every((item) => {
            return item.matricula !== matriculaAluno;
        });
        
        if (matriculaAlunoNaoEncontrada) {
            throw { status: 400, mensagem: "Matricula aluno não encontrada!" };
        };
        
        const sala = listaSalas.salas.find((item) => {
            return item.numero_sala === numeroSala;
        });
      
        const aluno = listaAlunos.alunos.find((item) => {
            return item.matricula === matriculaAluno;
        });
       
        sala.alunos.push(aluno)
    
        await writeFile('./src/dataBase/salasData.json', listaSalas, 'utf-8');

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

const removerAlunoDeUmaSala = async (req, res) => {
    
    try {
        
        const { matricula, matriculaAluno, numero_sala } = req.body;

        if (matricula.includes(" ") || numero_sala.includes(" ") || matricula.includes(" ")) {
            throw { status: 400, mensagem: "Matricula profeessor, número da sala ou matricula aluno inválidos!" };
        }

        const listaSalas = await readFile('./src/dataBase/salasData.json');
       
        const sala = listaSalas.salas.find((item) => {
            return item.numero_sala === numero_sala;
        });

        if (!sala) {
            throw { status: 404, mensagem: "Sala não encontrada!" }; 
        };

        const aluno = sala.alunos.find((item) => {
            return item.matricula === matriculaAluno;
        });

        if (!aluno) {
            throw { status: 404, mensagem: "Matricula aluno não encontrada!" };
        };

        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const professor = listaProfessores.professores.find((item) => {
            return item.matricula === matricula;
        });

        if (!professor) {
            throw { status: 404, mensagem: "Matricula professor não encontrada!" };
        };

        const listaAlunosAtualizada = sala.alunos.filter((item) => {
            return item !== aluno;
        });

        sala.alunos = listaAlunosAtualizada;

        await writeFile('./src/dataBase/salasData.json', listaSalas, 'utf-8');

        res.status(200).json();

    } catch (error) {
        
        if(error.message) {
            error.mensagem = error.message;
        }

        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

module.exports = {
    listarSalas,
    ProfessorConsultarSala,
    cadastrarSala,
    atualizarDadosSala,
    deletarSala,
    cadastrarAlunoNumaSala,
    removerAlunoDeUmaSala
}