const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const dbUrl =
  "mongodb+srv://heliorpjunior116:rJXctlaVfe2wlsEt@cluster0.7kodwr9.mongodb.net";
const dbName = "OceanJornadaBackendFev2024";

async function main() {
  const client = new MongoClient(dbUrl);

  console.log("Conectando ao banco de dados...");

  await client.connect();

  console.log("Banco de dados conectado com sucesso!");

  const app = express();

  app.use(express.json());

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

  app.post("/item", async function (req, res) {
    const item = req.body;

    await collection.insertOne(item);

    res.status(201).send(item);
  });

  app.put("/item/:id", async function (req, res) {
    const id = req.params.id;

    const novoItem = req.body;

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: novoItem });

    res.send("Item atualizado com sucesso!");
  });

  app.delete("/item/:id", async function (req, res) {
    const id = req.params.id;

    await collection.deleteOne({ _id: new ObjectId(id) });

    res.send("Item removido com sucesso!");
  });

  app.listen(3000);
}

main();
