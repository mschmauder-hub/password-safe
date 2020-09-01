const express = require("express");
const { authenticateLogin } = require("../lib/login");
const jwt = require("jsonwebtoken");

function createUsersRouter(database, tokenSecret) {
  const router = express.Router();

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authenticateLogin(email, password, database);

      if (!user) {
        res.status(401).send("Can't verify user");
        return;
      }
      const accessToken = jwt.sign({ user }, tokenSecret, {
        expiresIn: "500s",
      });

      res.setHeader(
        "Set-Cookie",
        `authToken = ${accessToken}; path=/;Max-Age=500`
      );

      res.send("Logged in");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  return router;
}

module.exports = createUsersRouter;
