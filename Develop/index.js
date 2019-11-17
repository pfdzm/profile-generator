let inquirer = require("inquirer");
const Octokit = require("@octokit/rest");

// https://octokit.github.io/rest.js/#usage
// User agent is required

const octokit = Octokit({
  userAgent: "portfolio-generator v0.1"
});

const questions = [
  { type: "input", name: "user", message: "GitHub username:" }
];

function writeToFile(fileName, data) {}

function init() {
  inquirer.prompt(questions).then(async answers => {
    let username = answers.user;

    let { data } = await octokit.users.getByUsername({
      username
    });

    console.log(data);
  });
}

init();
