require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { RESTPostAPIApplicationCommandsJSONBody, REST } from 'discord.js'
import { Routes } from 'discord-api-types/v10'

// Create an array of commands to deploy
const commands : RESTPostAPIApplicationCommandsJSONBody[] = []
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter((file : string) : boolean => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const { command } = require(filePath)
    commands.push(command.data.toJSON())
}

// Create a new REST
if(process.env.TOKEN && process.env.CLIENT_ID) {
    const rest : REST = new REST({ version : '10' }).setToken(process.env.TOKEN)

    // deploy the commands as application commands
    // **NOTE** these can take up to an hour to show in your bot
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body : commands })
        .then(() : void => console.log('Successfully registered application commands!'))
        .catch((error : any) : void => console.error('Error: ', error))
}