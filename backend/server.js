const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MySQLStore = require("express-mysql-session")(session);

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const mysql = require("mysql2");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();
const port = 3000;

// Importa config de conexão da database.
const config = require("./dbconfig");
const db = mysql.createConnection(config);

app.use("/css", express.static(path.join(__dirname, "../frontend/public/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/public/js")));
// app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do handling de autenticação de usuários.
const sessionStore = new MySQLStore({}, db);
const secretKey = crypto.randomBytes(32).toString("hex");
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    const sql = "SELECT * FROM usuarios WHERE username = ?";
    db.query(sql, [username], (err, results) => {
      if (err) {
        return done(err);
      }
      if (!results || results.length === 0) {
        return done(null, false, { message: "Usuário não encontrado." });
      }

      const user = results[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: "Senha incorreta." });
      }

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const sql = "SELECT * FROM usuarios WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return done(err);
    }
    if (!results || results.length === 0) {
      return done(null, false);
    }
    return done(null, results[0]);
  });
});

app
  .post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Aqui você pode personalizar a mensagem de erro e status de resposta
        return res
          .status(401)
          .send("Usuário não encontrado ou senha incorreta.");
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.status(200).send("Login bem-sucedido.");
      });
    })(req, res, next);
  })

  .post("/registro", async (req, res) => {
    const { username, password } = req.body;

    const [rows] = await db
      .promise()
      .query("SELECT * FROM usuarios WHERE username = ?", [username]);
    if (rows.length > 0) {
      return res.status(400).send("Usuário já registrado.");
    }
    // Criptografa a senha para um hash com brypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    await db
      .promise()
      .query("INSERT INTO usuarios (username, password) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);

    res.status(200).send("Usuário registrado com sucesso.");
  });

// Função para proteger rotas autenticadas.
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/"); // Redireciona para a página de login se não autenticado
}

// Rotas

app
  .get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
  })

  .get("/registrar", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/registrar.html"));
  })

  .get("/votacao", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/votacao.html"));
  })

  .get("/contagem", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/contagem.html"));
  });

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});

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
  .post("/api/votos", isAuthenticated, async (req, res) => {
    const { candidato } = req.body;
    const user_id = req.user.id;

    if (!candidato) {
      return res.status(400).json({ error: "Candidato não especificado" });
    }

    const sqlCheckVote = "SELECT * FROM votos WHERE user_id = ?";
    db.query(sqlCheckVote, [user_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao verificar voto" });
      }

      if (results.length > 0) {
        return res.status(400).send("Você já votou em um candidato");
      }

      const sql = "INSERT INTO votos (user_id, candidato) VALUES (?, ?)";
      db.query(sql, [user_id, candidato], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao adicionar voto" });
        }
        res.status(200).send("Voto registrado com sucesso");
      });
    });
  })
  // GET contagem (fetching votos e retornando contagem agrupando pelo candidato.)
  .get("/api/contagem", async (req, res) => {
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
