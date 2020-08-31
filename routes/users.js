const express = require("express");
const { authenticateLogin } = require("../lib/login");

function createUsersRouter(database) {
  const router = express.Router();

  //   router.get("/:user")

  router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const jwt = await authenticateLogin(email, password, database);
    console.log(jwt);
  });
  return router;
}

module.exports = createUsersRouter;
