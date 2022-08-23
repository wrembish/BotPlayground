import { Client } from 'discord.js'
import DiscordEvent from '../classes/DiscordEvent'

export const event : DiscordEvent = new DiscordEvent(
    'ready',
    true,
    /**
     * Function that will display in the console when the discord bot is connected
     * @param client The discord client that has successfully connected
     */
    (client : Client) : void => {
        // Alert the console that the bot is logged in and ready to go
        if(client.user) console.log(`Ready! Logged in as ${client.user.tag}!`)
    }
)