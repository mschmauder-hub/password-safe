const inquirer = require("inquirer");
const fs = require("fs").promises;

let questions = [
  {
    type: "list",
    name: "password",
    message: "What do you want to do?",
    choices: ["Get a password", "Set a password"],
  },
  { type: "password", name: "password", message: "Whats your password?" },
  { type: "input", name: "key", message: "Which password do you need?" },
];

inquirer.prompt(questions).then(async (answers) => {
  if (answers.password === "123") {
    try {
      const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
      let passwords = JSON.parse(passwordsJSON);
      if (passwords[answers.key]) {
        console.log(passwords[answers.key]);
      } else {
        console.log(`You have set no ${answers.key} password`);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("password incorrect");
  }
});
