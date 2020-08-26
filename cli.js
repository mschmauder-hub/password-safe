const inquirer = require("inquirer");
const { readPassword, writePassword } = require("./lib/passwords");
const {
  askInitialQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const fs = require("fs").promises;

async function main() {
  const { masterPassword, operation } = await askInitialQuestions();
  if (masterPassword === "123") {
    if (operation === CHOICE_GET) {
      const { key } = await askGetPasswordQuestions();
      const password = await readPassword(key);
      console.log(password);
    } else {
      const { key, password } = await askSetPasswordQuestions();

      await writePassword(key, password);
      console.log("Password set");
    }
  } else {
    console.log("password incorrect");
  }
}

main();
