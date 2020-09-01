const express = require("express");

const {
  readPassword,
  writePassword,
  readAllPasswords,
  updatePassword,
} = require("../lib/passwords");
const { decrypt, encrypt } = require("../lib/crypto");
const jwt = require("jsonwebtoken");

function createPasswordsRouter(database, masterPassword, tokenSecret) {
  const router = express.Router();

  router.use((req, res, next) => {
    try {
      const { authToken } = req.cookies;
      const user = jwt.verify(authToken, tokenSecret);

      console.log(user);
      next();
    } catch (error) {
      console.log("Error");
      res.send("Not logged in");
    }
  });

  router.post("/", async (req, response) => {
    try {
      const { key, password } = req.body;
      const encryptedPassword = await encrypt(password, masterPassword);

      const userPassword = await readPassword(key, database);
      if (userPassword) {
        response.status(403).send("Password is already set");
        return;
      }
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
    const { key, password } = req.body;
    const encryptedPassword = await encrypt(password, masterPassword);
    await updatePassword(key, encryptedPassword, database);
    res.send("Password updated");
  });

  return router;
}

module.exports = createPasswordsRouter;
