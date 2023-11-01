const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Importa config de conexão da database.
const config = require("./database");
const db = mysql.createConnection(config);

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(bodyParser.json());

// Configuração do handling para o banco de dados.
app
  // GET votos. (fetching todos os votos) test: http://localhost:3000/api/votos
  .get("/api/votos", (req, res) => {
    const sql = "SELECT * FROM votos";
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar votos" });
      } else {
        res.json(results);
      }
    });
  })
  // POST votos. (submetendo um voto novo)
  .post("/api/votos", (req, res) => {
    const { candidato } = req.body;
    if (!candidato) {
      return res.status(400).json({ error: "Candidato não especificado" });
    }

    const sql = "INSERT INTO votos (candidato) VALUES (?)";
    db.query(sql, [candidato], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao adicionar voto" });
      }
      res.status(201).json({ message: "Voto registrado com sucesso" });
    });
  })
  // GET contagem (fetching votos e retornando contagem agrupando pelo candidato.)
  .get("/api/contagem", (req, res) => {
    const sql =
      "SELECT candidato, COUNT(*) AS contagem FROM votos GROUP BY candidato";
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Erro ao buscar contagem de votos" });
      }
      res.json(results);
    });
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
