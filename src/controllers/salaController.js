const {readFile, writeFile} = require('../utils/fileUtils');

const listarSalas = async(req, res) => {

    const listaSalas = await readFile('./src/dataBase/salasData.json');
    res.status(200).json(listaSalas);
    
}

const ProfessorConsultarSala = async (req, res) => {

    try {

        const { matricula, numeroSala } = req.params;

        if (matricula.includes(" ") || numeroSala.includes(" ")) {
            throw { status: 400, mensagem: "Matricula ou número da sala inválidos!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json', 'utf-8')

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 404, mensagem: "Matricula não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json');

        const sala = listaSalas.salas.find((item) => {
            return item.numeroSala === numeroSala
        })        

        if (!sala) {
            throw { status: 404, mensagem: "Sala não encontrada!" };
        };

        res.status(200).json(sala);

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem })
    }

}

const cadastrarSala = async (req, res) => {

    try {

        const { matricula } = req.params;
        const { numeroSala, capacidadeAlunos, disponibilidade} = req.body;
        
        if (matricula.includes(" ") || numeroSala.includes(" ") || capacidadeAlunos.includes(" ") || (disponibilidade !== true && disponibilidade !== false)) {
            throw { status: 400, mensagem: "Dado(s) inválido(s)!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json', 'utf-8')

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula
        });

        if (matriculaNaoEncontrada) {
            throw { status: 404, mensagem: "Matricula não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json', 'utf-8');

        const salaEncontrada = listaSalas.salas.every((item) => {
            return item.numeroSala !== numeroSala;
        });

        if (!salaEncontrada) {
            throw { status: 404, mensagem: "Sala já cadastrada!" };
        };

        listaSalas.salas.push({
            numeroSala,
            capacidadeAlunos,
            disponibilidade,
            matriculaProfessorCriadorDaSala: matricula,
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

        const { matricula, numeroSala } = req.params;

        const { capacidadeAlunos, disponibilidade } = req.body;

        if (matricula.includes(" ") || numeroSala.includes(" ") || capacidadeAlunos.includes(" ") || (disponibilidade !== true && disponibilidade !== false)) {
            throw { status: 400, mensagem: "Dado(s) inválido(s)!" };
        }

        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const matriculaNaoEncontrada = listaProfessores.professores.every((item) => {
            return item.matricula !== matricula;
        });

        if (matriculaNaoEncontrada) {
            throw { status: 404, mensagem: "Matricula não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json', 'utf-8');

        const sala = listaSalas.salas.find((item) => {
            return item.numeroSala === numeroSala;
        });

        if (!sala) {
            throw { status: 404, mensagem: "Sala não encontrada!" };
        };

        sala.capacidadeAlunos = capacidadeAlunos;
        sala.disponibilidade = disponibilidade;

        await writeFile('./src/dataBase/salasData.json', listaSalas, 'utf-8');

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

const deletarSala = async (req, res) => {

    try {

        const { matricula, numeroSala } = req.params;

        if (matricula.includes(" ") || numeroSala.includes(" ")) {
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

        const sala = listaSalas.salas.find((item) => {
            return item.numeroSala === numeroSala;
        });

        if (!sala) {
            throw { status: 404, mensagem: "Sala não encontrada!" };
        };

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
        
        if (matriculaProfessor.includes(" ") || numeroSala.includes(" ") || matriculaAluno.includes(" ")) {
            throw { status: 400, mensagem: "Dado(s) inválido(s)!" };
        }
        
        const listaProfessores = await readFile('./src/dataBase/professoresData.json');

        const professor = listaProfessores.professores.find((item) => {
            return item.matricula === matriculaProfessor;
        })

        if (!professor) {
            throw { status: 404, mensagem: "Matricula professor não encontrada!" };
        };

        const listaSalas = await readFile('./src/dataBase/salasData.json');

        const salaNaoEncontrada = listaSalas.salas.every((item) => {
            return item.numeroSala !== numeroSala;
        });
    
        if (salaNaoEncontrada) {
            throw { status: 404, mensagem: "Sala não encontrada!" };
        };

        const listaAlunos = await readFile('./src/dataBase/alunosData.json');

        const matriculaAlunoNaoEncontrada = listaAlunos.alunos.every((item) => {
            return item.matricula !== matriculaAluno;
        });
        
        if (matriculaAlunoNaoEncontrada) {
            throw { status: 404, mensagem: "Matricula aluno não encontrada!" };
        };
        
        const sala = listaSalas.salas.find((item) => {
            return item.numeroSala === numeroSala;
        });
      
        const aluno = listaAlunos.alunos.find((item) => {
            return item.matricula === matriculaAluno;
        });

        if(sala.disponibilidade === false) {
            throw { status: 404, mensagem: "Sala não está disponível para novos cadastros de alunos" };
        }

        if(sala.matriculaProfessorCriadorDaSala !== professor.matricula) {
            throw { status: 404, mensagem: "Não autorizado. Sala criada por outro professor!" };
        }

        for (let i = 0; i < sala.length; i++) {
            if(sala.alunos[i] === aluno) {
                throw { status: 404, mensagem: "Aluno cadastrado!" };
            }
        }

        if (sala.alunos.some((alunoNaSala) => alunoNaSala.matricula === matriculaAluno)) {
            throw { status: 404, mensagem: "Aluno já cadastrado na sala!" };
        }
       
        sala.alunos.push(aluno)

        await writeFile('./src/dataBase/salasData.json', listaSalas, 'utf-8');

        res.status(200).json();

    } catch (error) {
        res.status(error.status || 500).json({ erro: error.mensagem });
    };

};

const removerAlunoDeUmaSala = async (req, res) => {
    
    try {
        
        const { matricula, matriculaAluno, numeroSala } = req.body;
        
        if (matricula.includes(" ") || numeroSala.includes(" ") || matriculaAluno.includes(" ")) {
            throw { status: 400, mensagem: "Matricula professor, número da sala ou matricula aluno inválidos!" };
        }
        
        const listaSalas = await readFile('./src/dataBase/salasData.json');
        
        const sala = listaSalas.salas.find((item) => {
            return item.numeroSala === numeroSala;
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