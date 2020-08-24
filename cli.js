const inquirer = require("inquirer");
const { readPassword } = require("./lib/passwords");
const {
  askInitialQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const fs = require("fs").promises;

async function main() {
  const { operation } = await askInitialQuestions();

  if (operation === CHOICE_GET) {
    const { masterPassword, key } = await askGetPasswordQuestions();

    if (masterPassword === "123") {
      const password = await readPassword(key);
      console.log(password);
    } else {
      console.log("password incorrect");
    }
  } else {
    const setPassword = await askSetPasswordQuestions();
    const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
    let passwords = JSON.parse(passwordsJSON);
  }
}

main();
