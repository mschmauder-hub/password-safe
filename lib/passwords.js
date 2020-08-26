const { createHash } = require("./crypto");

const fs = require("fs").promises;

async function readPassword(key) {
  const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);

  return passwords[key];
}

async function readPasswords() {
  const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
}

async function writePasswords(passwords) {
  const passwordsJSON = JSON.stringify(passwords, null, 2);
  await fs.writeFile("./passwords.json", passwordsJSON);
}

async function writePassword(key, value) {
  const passwords = await readPasswords();
  passwords[key] = value;
  await writePasswords(passwords);
}
async function readMasterPassword() {
  try {
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
  } catch (error) {
    return null;
  }
}

async function writeMasterPassword(masterPassword) {
  const hashedMasterPassword = createHash(masterPassword);
  await fs.writeFile("./masterPassword", hashedMasterPassword);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.readMasterPassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;
