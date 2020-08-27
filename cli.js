require("dotenv").config();

const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPassword,
} = require("./lib/passwords");
const {
  askInitialQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  askForNewMasterPassword,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const { encrypt, decrypt, verifyHash } = require("./lib/crypto");

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function main() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_NAME);

    const masterPassword = await readMasterPassword();

    if (!masterPassword) {
      const { newMasterPassword } = await askForNewMasterPassword();
      await writeMasterPassword(newMasterPassword);
      console.log("Master Password set!");
      return;
    }

    const { masterPasswordInput, operation } = await askInitialQuestions();

    if (!verifyHash(masterPasswordInput, masterPassword)) {
      console.log("password incorrect");
      return;
    }

    if (operation === CHOICE_GET) {
      const { key } = await askGetPasswordQuestions();
      const password = await readPassword(key, database);
      const decryptedPassword = decrypt(password, masterPasswordInput);
      console.log(decryptedPassword);
    } else {
      const { key, password } = await askSetPasswordQuestions();
      const encryptedPassword = encrypt(password, masterPasswordInput);

      await writePassword(key, encryptedPassword, database);

      console.log("Password set");
    }
  } finally {
    await client.close();
  }
}

main();
