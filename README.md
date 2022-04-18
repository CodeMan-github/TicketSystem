# Grade Air Case

Welcome to the Grade Air Case

This boilerplate project will help you out with the basic configurations of your server. But before we're able to use it, we'll have to make sure we have the right environments and dependencies installed on our device.

Clone this repository by running '`$ git clone https://github.com/Grade-Arc/Grade-Air-Case-Backend`' in a terminal of choice.

## Installation

It's adviced to use Visual Studio Code to create the Grade Arc Case as it's the default IDE used at Grade Arc. You can download VSC here: https://code.visualstudio.com/download

I'd also highly recommend using Ubuntu or Git Bash as your default terminal. To change the default build-in terminal used by VSC, hit '`Ctrl + P`' or '`⌘ + P`' and type '`> Select Default Shell`' and choose '`Git Bash`'. To open a new terminal in VSC simply go to '`Terminal`' in the top left and select '`New Terminal`'.

This project is build with Node.js (Nest.js) and Typescript, so let's go ahead and install the following:

- Node.js: https://nodejs.org/en/download/ or update to the latest version by running: `$ npm install -g npm@latest`
- Add or upgrade to the latest version of the Nest CLI by running: `$ npm i -g @nestjs/cli`

To check if the installations were successful you can run the following commands:
```bash
$ node -v
$ npm -v
$ nest -v
```

Now that you can access node, npm and nest in your terminal we're ready to navigate to the root-folder of this project (`./grade-air-case/`) and start installing our environment.

- Add node_modules to your project by installing the dependencies in package.json by running `$ npm i`

In order to start the project run the following command: `$ npm run start:dev`
