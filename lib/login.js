const fs = require("fs").promises;

async function authenticateLogin(email, password, database) {
  const collection = database.collection("users");
  const user = await collection.findOne({ email, password });

  if (!user) {
    return null;
  }

  return user.email;
}

exports.authenticateLogin = authenticateLogin;
