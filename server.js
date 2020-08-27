require("dotenv").config();
const express = require("express");

const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");

app.listen(port, () => {
  console.log("App is listening ");
});

app.get("/", (req, res) => {
  db.collection("passwords")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
    });

  MongoClient.connect(process.env.MONGO_URI).then((client) => {
    const db = client.db(process.env.MONGO_NAME);
  });
});
