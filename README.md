# API de gerencimaneto de salas, professores e alunos

 Ela oferece recursos para cadastro, edição, exclusão e consulta de dados de alunos, professores e salas, bem como a alocação de alunos em salas.


## Estrutura da api

 A aplicação está contida na pasta **src** e dentro dela temos as pastas:

**controllers** - onde estão contidos os arquivos de controle da aplicação.

**database** - onde estão contidos os bancos de dados do projeto.

**routes** - onde estão contidos os arquivos das rotas.

**utils** - onde estão contidas funções utilitárias.

## Requisitos funcionais

### Aluno

- **RF01**: Permitir que aluno se cadastre na aplicação.
- **RF02**: Permitir que aluno edite seus dados de cadastro.
- **RF03**: Permitir que aluno exclua seus dados de cadastro.
- **RF04**: Permitir que aluno consulte seus dados de cadastro.
- **RF05**: Permitir que aluno consulte todas as salas que deverá comparecer.

### Professor

- **RF06**: Permitir que professor se cadastre na aplicação.
- **RF07**: Permitir que professor edite seus dados de cadastro.
- **RF08**: Permitir que professor exclua seus dados de cadastro.
- **RF09**: Permitir que professor consulte seus dados de cadastro.
- **RF10**: Permitir que professor cadastre uma nova sala.
- **RF11**: Permitir que professor edite os dados de uma sala.
- **RF12**: Permitir que professor exclua os dados de uma sala.
- **RF13**: Permitir que professor consulte os dados de uma sala.
- **RF14**: Permitir que professor aloque um aluno em uma sala.
- **RF15**: Permitir que professor remova o aluno de uma sala.
- **RF16**: Permitir que professor consulte todos os alunos de uma sala.

## Regras de Negócio

### Aluno

- **RN01 (RF01)**: Deve ser coletado do aluno os seguintes dados: Nome, e-mail, matrícula, data de nascimento.

### Professor

- **RN02 (RF06)**: Deve ser coletado do professor os seguintes dados: Nome, e-mail, matrícula, data de nascimento.
- **RN05 (RF14)**: O professor não poderá alocar um aluno para uma sala que não tenha sido criada por ele.

### Sala

- **RN03 (RF10)**: Deve ser coletado da sala: Número da sala, capacidade de alunos, disponibilidade (Se pode alocar aluno ou não).
- **RN03 (RF14)**: A sala não pode possuir o mesmo aluno mais de uma vez.
- **RN04 (RF14)**: A sala não pode exceder sua capacidade de alunos.

## Instalação e Uso

1. Clone este repositório em sua máquina local:

    - git clone https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores#aluno-1

2. Instale as dependências necessárias:
    - npm install
3. Inicie o servidor:
    - npm start
4. Acesse a API no seguinte URL: `http://localhost:3000` (ou o endereço que você configurou).

## Documentação da API

## Rotas alunos  


- **Listar alunos**:

   ```javascript
   GET localhost:3000/aluno
    
    - Resposta da API:
    
    {
	"alunos":[
                {
                "nome": "Nome Aluno",
                "email": "aaa@gmail.com",
                "matricula": "1",
                "dataNascimento": "09/dez"
                }
	         ]
    }

- **Aluno consulta as salas em que está cadastrado**:

    ```javascript
    GET localhost:3000/aluno/:matriculaAluno

    - Resposta da API:
    
    [
        "1A",
        "2B"
    ]

- **Cadastrar aluno**:

    ```javascript
    POST localhost:3000/aluno

    - Requisição em formato JSON necessária
    
    {
	    "nome":"Nome Aluno",
	    "email":"xxx@gmail.com",
	    "matricula":"1",
	    "dataNascimento": "09/dez"
    }

- **Atualizar aluno**:

    ```javascript
    PUT localhost:3000/aluno/:matriculaAluno

    - Requisição em formato JSON necessária.
    - Matrícula é um dado único e imutável.
    
    {
	    "nome":"Nome Aluno",
	    "email":"xxx@gmail.com",
	    "dataNascimento": "09/dez"
    }

- **Deletar aluno**:

    ```javascript
    DELETE localhost:3000/aluno/:matriculaAluno

    - Nessa rota só é necessário passar uma matriculaAluno válida.

## Rotas Professores  
    
- **Listar professores**:

   ```javascript
   GET localhost:3000/professor
    
    - Resposta da API:
    
    {
	"professores": [
            {
                "nome": "prof1",
                "email": "gmail",
                "matricula": "1",
                "dataNascimento": "09/jun"
            },
            {
                "nome": "prof2",
                "email": "hotmail",
                "matricula": "0",
                "dataNascimento": "14/fv"
            }
	    ]
    }

- **Consultar professor**:

   ```javascript
   GET localhost:3000/professor/:matriculaProfessor
    
    - Resposta da API:
    
    {
        "nome": "Prof1",
        "email": "gmail",
        "matricula": "123",
        "dataNascimento": "22/out"
    }
    
- **Cadastrar professor**:

    ```javascript
    POST localhost:3000/professor

    - Requisição em formato JSON necessária
    
    {
	    "nome":"Nome professor",
	    "email":"xxx@gmail.com",
	    "matricula":"1",
	    "dataNascimento": "09/dez"
    }

- **Atualizar professor**:

    ```javascript
    PUT localhost:3000/aluno/:matriculaProfessor

    - Requisição em formato JSON necessária.
    - Matrícula é um dado único e imutável.
    
    {
	    "nome":"Nome professor",
	    "email":"xxx@gmail.com",
	    "dataNascimento": "09/dez"
    }

- **Deletar professor**:

    ```javascript
    DELETE localhost:3000/aluno/:matriculaProfessor

    - Nessa rota só é necessário passar uma matricula válida.

## Rotas salas

- **Somente os professores tem acesso e permissão a rotas das salas, com exeção apenas da rota para um aluno consultar as salas em que está cadastrado**

- **Listar salas**:

   ```javascript
   GET localhost:3000/sala
    
    - Resposta da API:
    
    {
        "salas": [
            {
                "numeroSala": "1A",
                "capacidadeAlunos": "50",
                "disponibilidade": true OU false,
                "matriculaProfessorCriadorDaSala": "12",
                "alunos": []
            },
            {
                "numeroSala": "2B",
                "capacidadeAlunos": "50",
                "disponibilidade": true OU false,
                "matriculaProfessorCriadorDaSala": "0",
                "alunos": []
            }
        ]
    }

- **Consultar os alunos de uma sala**:

   ```javascript
   GET localhost:3000/sala/professor/:matriculaProfessor/:numeroSala
    
    - Resposta da API:
    
    {
        "numeroSala": "2b",
        "capacidadeAlunos": "20",
        "disponibilidade": true,
        "alunos": []
    }

- **Cadastrar sala**:

   ```javascript
   POST localhost:3000/sala/professor/:matriculaProfessor
    
    - Resposta da API:
    
    {
        "numeroSala":"1A",
        "capacidadeAlunos": "20",
        "disponibilidade": true
    }

- **Atualizar sala**:

   ```javascript
   PUT localhost:3000/sala/professor/:matriculaProfessor/:numeroSala
    
    - Resposta da API:
    - Os outros dados são únicos e imutáveis.
    
    {
        "capacidadeAlunos": "50",
        "disponibilidade": true 
    }

- **Deletar sala**:

    ```javascript
    DELETE localhost:3000/sala/profeessor/:matriculaProfessor/:numeroSala

    - Nessa rota só é necessário passar uma matriculaProfessor válida e um numeroSala válido.

- **Cadastrar aluno numa sala**:

    ```javascript
    POST localhost:3000/sala/professor

    - Requisição em formato JSON necessária
    - O professor só pode cadastrar alunos em salas criadas por eles
    
    {
        "matriculaProfessor": "0",
        "matriculaAluno": "2",
        "numeroSala":"2B"
    }

- **Remover aluno de uma sala**:

    ```javascript
    POST localhost:3000/sala/professor

    - Requisição em formato JSON necessária
    - So é necessário passar matricula valida de um professor, matriculaAluno e numeroSala válidos
    
    {
        "matricula": "12",
        "matriculaAluno": "2",
        "numeroSala":"1A"
    }

