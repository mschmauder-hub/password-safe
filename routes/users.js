const express = require("express");
const { authenticateLogin } = require("../lib/login");
const jwt = require("jsonwebtoken");

function createUsersRouter(database) {
  const router = express.Router();

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateLogin(email, password, database);

    const accessToken = jwt.sign(user, "asdasdasd12e12ed1");

    res.json({ accessToken });
  });
  return router;
}

module.exports = createUsersRouter;
