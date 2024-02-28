const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const dbUrl =
  "mongodb+srv://heliorpjunior116:rJXctlaVfe2wlsEt@cluster0.dvjajhv.mongodb.net";
const dbName = "OceanJornadaBackendFev2024";

async function main() {
  const client = new MongoClient(dbUrl);

  console.log("Conectando ao banco de dados...");

  await client.connect();

  console.log("Banco de dados conectado com sucesso!");

  const app = express();

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.get("/oi", function (req, res) {
    res.send("Olá mundo!");
  });

  const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

  const db = client.db(dbName);
  const collection = db.collection("items");

  app.get("/item", async function (req, res) {
    const items = await collection.find().toArray();

    res.json(items);
  });

  app.get("/item/:id", async function (req, res) {
    const { id } = req.params;

    const item = await collection.findOne({
      _id: new ObjectId(id),
    });

    res.json(item);
  });

  app.use(express.json());

  app.post("/item", function (req, res) {
    const { nome } = req.body;

    lista.push(nome);

    res.status(201).json({ mensagem: "Item adicionado com sucesso!" });
  });

  app.listen(3000);
}

main();
