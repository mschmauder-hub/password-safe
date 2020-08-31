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

  // app.use((request,))

  app.get("/api/passwords/:name", async (req, response) => {
    try {
      const key = req.params.name;
      const encryptedPassword = await readPassword(key, database);
      if (!encryptedPassword) {
        response.status(404).send(`Password ${key} not found`);
        return;
      }

      const password = decrypt(encryptedPassword, masterPassword);

      response.send(password);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });
  app.get("/passwords", async (req, res) => {
    const allPasswords = await readAllPasswords(database);
    res.send(allPasswords);
  });

  app.use("/api/passwords", createPasswordsRouter(database));

  app["patch"]("/update", async (req, res) => {
    await updatePassword(database);
    res.send("test");
  });

  app.listen(port, () => {
    console.log("App is listening ");
  });
}

main();
