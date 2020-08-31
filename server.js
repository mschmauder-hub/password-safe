require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");
const createPasswordsRouter = require("./routes/passwords");
const createUsersRouter = require("./routes/users");

const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});

const masterPassword = "123";

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_NAME);

  app.use("/api/passwords", createPasswordsRouter(database, masterPassword));
  app.use("/api/users", createUsersRouter(database));

  app.listen(port, () => {
    console.log("App is listening ");
  });
}

main();
