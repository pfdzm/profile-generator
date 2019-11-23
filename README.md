# Developer Profile Generator

A command-line application that dynamically generates a PDF profile from a GitHub username.

## Requirements (Linux)

A pre exisiting Chromium installation is recommended and required for Ubuntu running under Windows Subsystem for Linux. Otherwise puppeteer's packaged Chromium will be missing some required libraries.

To install:

```sh
sudo apt-get install chromium-browser
```

## Usage

```sh
node index.js
```

The user will be prompted for a favorite color, which will be used as the background color for cards.

The PDF will be populated with the following:

- Profile image
- User name
- Links to the following:
  - User location via Google Maps
  - User GitHub profile
  - User blog
- User bio
- Number of public repositories
- Number of followers
- Number of GitHub stars
- Number of users following
