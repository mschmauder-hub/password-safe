const express = require("express");

function createUsersRouter(database) {
  const router = express.Router();

  //   router.get("/:user")

  router.post("/", async (req, res) => {
    console.log(req.body);
  });
  return router;
}

module.exports = createUsersRouter;
