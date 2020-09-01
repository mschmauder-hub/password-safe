const express = require("express");
const { authenticateLogin } = require("../lib/login");
const jwt = require("jsonwebtoken");

function createUsersRouter(database, tokenSecret) {
  const router = express.Router();

  router.get("/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const { authToken } = req.cookies;
      const decodedToken = jwt.verify(authToken, tokenSecret);
      console.log(decodedToken);
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authenticateLogin(email, password, database);

      const accessToken = jwt.sign({ user }, tokenSecret, {
        expiresIn: "500s",
      });

      res.setHeader(
        "Set-Cookie",
        `authToken = ${accessToken}; path=/;Max-Age=500`
      );

      res.send("Logged in");

      if (!user) {
        res.status(401).send("Can't verify user");
        return;
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  });
  return router;
}

module.exports = createUsersRouter;
