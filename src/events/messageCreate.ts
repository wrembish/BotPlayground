import { COMMANDCHAR, DATABASEERRORMESSAGE, EMOJI } from '../classes/Constants'
import DiscordEvent from '../classes/DiscordEvent'
import { convert } from '../classes/Helpers'
import { Message } from 'discord.js'

export const event : DiscordEvent = new DiscordEvent(
    'messageCreate',
    false,
    /**
     * Function for handling messages sent in servers/channels the bot has access to
     * @param message The message that was sent in the server/channel that the bot has access to
     */
    async (message : Message) : Promise<void> => {
        // Don't let the bot respond to itself
        if(message.client.user && message.client.user.id === message.author.id) return

        // Constant to shorten writing out message.content
        const msg = message.content

        // Classic ping command as a message command
        if(msg == COMMANDCHAR+'ping') await message.channel.send('Pong!')
        // Command for quick testing
        else if(msg === COMMANDCHAR+'test') {
            // Do something
        } else if(msg.startsWith(EMOJI) && msg.split(' ').length > 1) {
            const msgToConvert : string = msg.substring(EMOJI.length)
            if(msgToConvert.length > 0) {
                const replyContent : string = await convert(msgToConvert)
                await message.channel.send(replyContent)
            } else await message.channel.send(DATABASEERRORMESSAGE)
        }
    }
)