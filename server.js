require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");
const {
  readPassword,
  writePassword,
  readAllPasswords,
  updatePassword,
} = require("./lib/passwords");
const { decrypt, encrypt } = require("./lib/crypto");
const { response } = require("express");

const client = new MongoClient(process.env.MONGO_URI);

const masterPassword = "123";

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_NAME);

  app.get("/api/passwords/:name", async (req, response) => {
    const key = req.params.name;
    const encryptedPassword = await readPassword(key, database);
    const password = decrypt(encryptedPassword, masterPassword);

    response.send(password);
  });
  app.get("/passwords", async (req, res) => {
    const allPasswords = await readAllPasswords(database);
    res.send(allPasswords);
  });

  app.post("/create", async (req, response) => {
    const { key, password } = req.body;

    const encryptedPassword = await encrypt(password, masterPassword);

    await writePassword(key, encryptedPassword, database);
  });

  app.put("/update", async (req, res) => {
    console.log("test");
    await updatePassword(database);
    res.send("test");
  });

  app.listen(port, () => {
    console.log("App is listening ");
  });
}

main();
