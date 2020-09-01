const express = require("express");
const { authenticateLogin } = require("../lib/login");
const jwt = require("jsonwebtoken");

function createUsersRouter(database, tokenSecret) {
  const router = express.Router();

  router.get("/login", async (req, res) => {
    try {
      const token = req.cookies.authToken;
      const decodedToken = jwt.verify(token, tokenSecret);
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

      console.log(accessToken);

      res.setHeader(
        "Set-Cookie",
        `authToken = ${accessToken}; path=/;Max-Age=500`
      );

      res.send("Logged in");
    } catch (error) {
      console.error(error);
    }
  });
  return router;
}

module.exports = createUsersRouter;
