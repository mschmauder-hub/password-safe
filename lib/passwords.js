const { createHash } = require("./crypto");

const fs = require("fs").promises;

async function readPassword(key, database) {
  const collection = database.collection("passwords");
  const password = await collection.findOne({
    name: key,
  });
  if (!password) {
    return null;
  }
  return password.value;
}

async function readAllPasswords(database) {
  const collection = database.collection("passwords");
  const allPasswords = await collection.find().toArray();
  return allPasswords;
}

async function writePassword(key, value, database) {
  const collection = database.collection("passwords");
  await collection.insertOne({
    name: key,
    value: value,
  });
}
async function readMasterPassword() {
  try {
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
  } catch (error) {
    return null;
  }
}

async function updatePassword(key, password, database) {
  const collection = database.collection("passwords");
  collection.updateOne({ name: key }, { $set: { value: password } });
}

async function writeMasterPassword(masterPassword) {
  const hashedMasterPassword = createHash(masterPassword);
  await fs.writeFile("./masterPassword", hashedMasterPassword);
}

exports.readPassword = readPassword;
exports.readAllPasswords = readAllPasswords;
exports.writePassword = writePassword;
exports.readMasterPassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;
exports.updatePassword = updatePassword;
