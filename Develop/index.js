const inquirer = require("inquirer");
const Octokit = require("@octokit/rest");
const generator = require("./generateHTML.js");
const fs = require("fs").promises;

async function writeToFile(fileName, data) {
  let html = generator.generateHTML(data);
  await fs.writeFile(`./${fileName}`, html);
}

async function getGitHubUser(answers) {
  // https://octokit.github.io/rest.js/#usage
  // User agent is required
  const octokit = Octokit({
    userAgent: "portfolio-generator v0.1"
  });

  let { data } = await octokit.users.getByUsername({
    username: answers.user
  });
  return data;
}

(async function init() {
  const questions = [
    { type: "input", name: "user", message: "Enter a GitHub username:" },
    {
      type: "list",
      name: "color",
      message: "Pick a color theme:",
      choices: ["red", "blue", "pink", "green"]
    }
  ];
  try {
    let answers = await inquirer.prompt(questions);
    let data = await getGitHubUser(answers);

    await writeToFile("index.html", { color: answers.color, user: data });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
