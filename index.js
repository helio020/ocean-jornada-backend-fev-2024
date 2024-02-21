const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/oi", function (req, res) {
  res.send("Olá mundo!");
});

const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

app.get("/item", function (req, res) {
  res.json(lista);
});

app.get("/item/:id", function (req, res) {
  const { id } = req.params;

  const item = lista[id];

  res.json(item);
});

app.use(express.json());

app.post("/item", function (req, res) {
  const { nome } = req.body;

  lista.push(nome);

  res.status(201).json({ mensagem: "Item adicionado com sucesso!" });
});

app.listen(3000);
