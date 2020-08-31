const express = require("express");

const {
  readPassword,
  writePassword,
  readAllPasswords,
  updatePassword,
} = require("../lib/passwords");
const { decrypt, encrypt } = require("../lib/crypto");

function createPasswordsRouter(database, masterPassword) {
  const router = express.Router();

  router.post("/", async (req, response) => {
    try {
      const { key, password } = req.body;
      const encryptedPassword = await encrypt(password, masterPassword);
      await writePassword(key, encryptedPassword, database);
      response.status(201).send(`Password ${key} Created`);
    } catch (error) {
      console.error(error);
    }
  });

  router.get("/", async (req, res) => {
    const allPasswords = await readAllPasswords(database);
    res.send(allPasswords);
  });

  router.get("/:name", async (req, response) => {
    try {
      const key = req.params.name;

      const encryptedPassword = await readPassword(key, database);
      if (!encryptedPassword) {
        response.status(404).send(`Password ${key} not found`);
        return;
      }
      const password = await decrypt(encryptedPassword, masterPassword);
      response.send(password);
    } catch (error) {
      console.error(error);
    }
  });

  router["patch"]("/update", async (req, res) => {
    await updatePassword(database);
    res.send("test");
  });

  return router;
}

module.exports = createPasswordsRouter;

// try {
// } catch (error) {
//     console.error(error);
//     response.status(500).send(error.message);
//   }
