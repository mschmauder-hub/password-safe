const inquirer = require("inquirer");
const { readPassword, writePassword } = require("./lib/passwords");
const {
  askInitialQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const { encrypt, decrypt } = require("./lib/crypto");
const fs = require("fs").promises;

async function main() {
  const { masterPassword, operation } = await askInitialQuestions();
  if (masterPassword === "123") {
    if (operation === CHOICE_GET) {
      const { key } = await askGetPasswordQuestions();
      const password = await readPassword(key);
      const decryptedPassword = decrypt(password, masterPassword);
      console.log(decryptedPassword);
    } else {
      const { key, password } = await askSetPasswordQuestions();
      const encryptedPassword = encrypt(password, masterPassword);

      await writePassword(key, encryptedPassword);

      console.log("Password set");
    }
  } else {
    console.log("password incorrect");
  }
}

main();
