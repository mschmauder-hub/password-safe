const fs = require("fs").promises;

async function authenticateLogin(email, password, database) {
  const collection = database.collection("users");
  const user = await collection.findOne({ email });
  if (user.password === password) {
    return user.email;
  }

  return null;
}

exports.authenticateLogin = authenticateLogin;
