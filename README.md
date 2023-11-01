# Voting App

O "Voting App" é uma aplicação web que permite aos usuários participar de votações e coletar dados sobre as preferências dos participantes. O aplicativo foi projetado para ser simples e eficiente, proporcionando uma experiência de votação fácil e direta.

## Alunos

* Luana Revoredo Braz de Souza - 01555750
* Luiz Felipe de Sousa Sá - 01532557
* Pedro Braz de Oliveira Viana - 01535206
* Pedro São Paulo da Silva Santos - 01503728
* Thiago Pininga Tavares - 01525716
* Victor Silva Dutra de Amorim - 01515499

## Processos de execução

Seguir os procedimentos abaixo:

### Configuração do Banco de Dados

1. Certifique-se de ter o MySQL instalado em sua máquina.

2. Crie e use um novo banco de dados com o nome `voting_app_db`:

   ```sql
   CREATE DATABASE voting_app_db;
   USE voting_app_db;
   ```

3. Execute o seguinte comando SQL para criar a tabela necessária:

   ```sql
   CREATE TABLE votos (
   id INT AUTO_INCREMENT PRIMARY KEY,
   candidato VARCHAR(255) NOT NULL
   );
   ```

4. Na pasta do backend, crie um novo arquivo chamado database.js:

   ```js
   const config = {
     host: "localhost", // Substitua pelo endereço do seu banco de dados, se necessário.
     user: "username", // Substitua pelo nome de usuário do banco de dados.
     password: "password", // Substitua pela senha do banco de dados.
     database: "voting_app_db",

   module.exports = config;
   ```