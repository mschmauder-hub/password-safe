const inquirer = require("inquirer");

const CHOICE_GET = "Get a password";
const CHOICE_SET = "Set a password";

const questionsNewMasterPassword = [
  {
    type: "password",
    name: "newMasterPassword",
    message: "Please enter your new master password",
  },
];

const initialQuestion = [
  {
    type: "password",
    name: "masterPasswordInput",
    message: "Whats your password?",
  },
  {
    type: "list",
    name: "operation",
    message: "What do you want to do?",
    choices: [CHOICE_GET, CHOICE_SET],
  },
];

const questionsGet = [
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

function askForNewMasterPassword() {
  return inquirer.prompt(questionsNewMasterPassword);
}

exports.askInitialQuestions = askInitialQuestions;
exports.askGetPasswordQuestions = askGetPasswordQuestions;
exports.askSetPasswordQuestions = askSetPasswordQuestions;
exports.askForNewMasterPassword = askForNewMasterPassword;
exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;
