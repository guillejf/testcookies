const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.listen(8000, () => {
  console.log(`Example app listening on port http://localhost:8000`);
});

function auth(req, res, next) {
  if (req.session?.user === "pepe" && req.session?.admin) {
    return next();
  } else {
    return res.status(401).send("error de autorización!");
  }
}

app.get("/", (req, res) => {
  if (req.session.cont) {
    req.session.cont++;
    res.send("nos visitaste " + req.session.cont);
  } else {
    req.session.cont = 1;
    res.send("nos visitaste " + 1);
  }
});

app.get("/showsession", (req, res) => {
  res.json(req.session);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.send("borramos todos quedate tranquilo que ya estas deslogeado");
    }
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "pepe" || password !== "pepepass") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.send("login success!");
});

app.get("/informacionconfidencial", auth, (req, res) => {
  res.send(
    "si estas viendo esto es porque ya te logueaste, sos admin y sos pepe!"
  );
});
