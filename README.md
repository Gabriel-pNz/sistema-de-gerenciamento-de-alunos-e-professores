# API de gerencimaneto de salas, professores e alunos

 Ela oferece recursos para cadastro, edição, exclusão e consulta de dados de alunos, professores e salas, bem como a alocação de alunos em salas.


## Estrutura da api

![estrutura-pastas](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/c88525ba-82e0-4787-847c-885dd2594f02)

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
- 
    - Resposta da API:
    
  ![rota1](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/865d8e80-88ee-4f0a-a769-8eaa1d3fb907)

- **Aluno consulta as salas em que está cadastrado**:

![rota2](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/e40123c0-61fb-4b60-b3df-6f52b8510ad7)
   
- **Cadastrar aluno**:

   ![rota3](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/86dabae1-cb4f-44d1-80f7-76381d10f574)

- **Atualizar aluno**:

![rota4](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/87e3b11d-96f8-40e3-ae2e-cab226d5cf5f)

- **Deletar aluno**:

    ```javascript
    DELETE localhost:3000/aluno/:matriculaAluno

    - Nessa rota só é necessário passar uma matriculaAluno válida.

## Rotas Professores  
    
- **Listar professores**:

![rota1](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/54e8955f-c62b-47af-9bc7-a3719a915415)


- **Consultar professor**:
  
![rota2](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/43d35992-b6c8-46a5-892f-ce6504d0839b)
    
- **Cadastrar professor**:

![rota3](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/e3fadf88-63ca-4c67-b3e5-91e01d0850f4)

- **Atualizar professor**:

![rota4](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/26b3fa97-32f8-48ce-b6d9-7a65eb64a682)

- **Deletar professor**:

    ```javascript
    DELETE localhost:3000/aluno/:matriculaProfessor

    - Nessa rota só é necessário passar uma matricula válida.

## Rotas salas

- **Somente os professores tem acesso e permissão a rotas das salas, com exeção apenas da rota para um aluno consultar as salas em que está cadastrado**

- **Listar salas**:
  
![rota1](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/1fed6cc4-181f-4778-a8b9-d6cc1ae594be)

- **Consultar os alunos de uma sala**:

![rota2](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/8094231c-4126-4e81-893d-101d13b507c9)

- **Cadastrar sala**:

![rota3](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/c7968148-1fd6-43d7-b731-2ed263d5eee2)

- **Atualizar sala**:
- 
![rota4](https://github.com/Gabriel-pNz/sistema-de-gerenciamento-de-alunos-e-professores/assets/105496955/603e817f-8fb1-4306-b8f1-236506e3285b)

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

