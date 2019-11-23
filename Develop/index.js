const inquirer = require("inquirer");
const Octokit = require("@octokit/rest");
const generator = require("./generateHTML.js");
const fs = require("fs").promises;
const puppeteer = require("puppeteer");
const path = require("path");

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

async function printPDF() {
  try {
    const browser = await puppeteer.launch({
      // these arguments allow puppeteer to work on WSL 2 without going through quite a bit of work to set up a viable sandbox
      // see https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox for more info
      // since we trust the HTML (we create it ourselves!) this should be fine
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(`file:${path.join(__dirname, "index.html")}`);
    await page.pdf({ path: path.join(__dirname, "profile.pdf"), format: "A4" });

    await browser.close();
    console.log("PDF generated!");
  } catch (error) {
    console.log(error);
  }
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
    await writeToFile("index.html", {
      color: answers.color,
      user: data
    });
    await printPDF();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
