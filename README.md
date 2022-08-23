# BotPlayground
Workspace for playing around with Discord Bot development

## Environment Variables
* TOKEN="YOUR DISCORD BOT TOKEN GOES HERE"
* MONGODB_URL="YOUR MONGODB CONNECTION URL GOES HERE"
* CLIENT_ID="YOUR BOTS DISCORD ID"
* TESTSERVER="THE GUILD ID OF YOUR TEST DISCORD SERVER GOES HERE"
* ADMIN="DISCORD USER ID FOR ADMIN USER OF BOT"

## Commands
* npm i / npm install
  * Installs the dependencies from the package.json
* npm start / npm run start
  * Will run npx tsc on the directory then run node dist/index.js
* npm run dev
  * Will deploy the slash commands in the commands folder as guild commands to your testing server
  * Then will run nodemon src/index.ts
* npm run deploy-commands
  * Will run npx tsc on the directory then run node dist/deploy-commands.js
* npm run test
  * Will run ts-node src/test.ts
    * Mainly used for testing new features during development before adding them to the bot source code

## Notes