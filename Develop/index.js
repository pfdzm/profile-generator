const inquirer = require("inquirer");
const Octokit = require("@octokit/rest");
const generator = require("./generateHTML.js");
const fs = require("fs");

// https://octokit.github.io/rest.js/#usage
// User agent is required

const octokit = Octokit({
  userAgent: "portfolio-generator v0.1"
});

const questions = [
  { type: "input", name: "user", message: "GitHub username:" },
  {
    type: "list",
    name: "color",
    message: "pick a color",
    choices: ["red", "blue", "pink", "green"]
  }
];

function writeToFile(fileName, data) {
  let html = generator.generateHTML(data);
  fs.writeFile(`./${fileName}`, html, function(err) {
    if (err) throw err;
    console.log("HTML generated!");
  });
}

function init() {
  inquirer.prompt(questions).then(async answers => {
    let { data } = await octokit.users.getByUsername({
      username: answers.user
    });

    writeToFile("index.html", { color: answers.color, user: answers.user });

    console.log(data);
  });
}

init();
