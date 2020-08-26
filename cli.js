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

async function main() {
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
    const password = await readPassword(key);
    const decryptedPassword = decrypt(password, masterPasswordInput);
    console.log(decryptedPassword);
  } else {
    const { key, password } = await askSetPasswordQuestions();
    const encryptedPassword = encrypt(password, masterPasswordInput);

    await writePassword(key, encryptedPassword);

    console.log("Password set");
  }
}

main();
