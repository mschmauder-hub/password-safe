const express = require("express");
const { authenticateLogin } = require("../lib/login");
const jwt = require("jsonwebtoken");

function createUsersRouter(database) {
  const router = express.Router();

  //   router.get("/:user")

  router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const test = await authenticateLogin(email, password, database);
    console.log(test);
    const accessToken = jwt.sign(test);
    console.log(accessToken);
  });
  return router;
}

module.exports = createUsersRouter;
