const inquirer = require("inquirer");

let questions = [
  { type: "password", name: "password", message: "Whats your password?" },
  { type: "input", name: "name", message: "Whats your name?" },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Hi ${answers.password}`);
});

// const password = readlineSync.question("What is your password?", {
//   hideEchoBack: true,
// });
