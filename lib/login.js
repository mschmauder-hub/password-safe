const fs = require("fs").promises;

async function authenticateLogin(email, password, database) {
  const collection = database.collection("users");
  const user = await collection.findOne({ email: email });
  if (user.password === password) {
    return user;
  }

  return null;
}

exports.authenticateLogin = authenticateLogin;
