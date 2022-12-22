const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser("clave secreta"));

app.listen(8000, () => {
  console.log(`Example app listening on port http://localhost:8000`);
});

app.get("/", (req, res) => {
  res
    .cookie("name", "guille", { signed: true, httpOnly: true })
    .send("hola mundo y te meti una cookie");
});

app.get("/verlascookies", (req, res) => {
  //   console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("abri la consola para ver si el back tiene las cookies");
  //res.cookie("name", "guille").send("hola mundo y te meti una cookie");
});
