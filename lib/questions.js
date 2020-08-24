const inquirer = require("inquirer");

const CHOICE_GET = "Get a password";
const CHOICE_SET = "Set a password";

const initialQuestion = [
  {
    type: "list",
    name: "operation",
    message: "What do you want to do?",
    choices: [CHOICE_GET, CHOICE_SET],
  },
];

const questionsGet = [
  { type: "password", name: "masterPassword", message: "Whats your password?" },
  { type: "input", name: "key", message: "Which password do you need?" },
];
const questionsSet = [
  { type: "input", name: "key", message: "Which password do you want to set?" },
  { type: "password", name: "password", message: "Enter your password" },
];

function askInitialQuestions() {
  return inquirer.prompt(initialQuestion);
}

function askGetPasswordQuestions() {
  return inquirer.prompt(questionsGet);
}

function askSetPasswordQuestions() {
  return inquirer.prompt(questionsSet);
}

exports.askInitialQuestions = askInitialQuestions;
exports.askGetPasswordQuestions = askGetPasswordQuestions;
exports.askSetPasswordQuestions = askSetPasswordQuestions;
exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;
