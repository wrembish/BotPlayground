import { COMMANDCHAR, DATABASEERRORMESSAGE, EMBEDCOLOR, EMOJI } from '../classes/Constants'
import * as cron from 'node-cron'
import DiscordEvent from '../classes/DiscordEvent'
import { buildCronStr, convert } from '../classes/Helpers'
import { EmbedBuilder, Message } from 'discord.js'

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
        } else if(msg.startsWith(`${COMMANDCHAR}set channel dogfacts `)) {
            const timeStr : string = msg.substring(`${COMMANDCHAR}set channel dogfacts `.length)
            if(timeStr != '' && (timeStr.endsWith('AM') || timeStr.endsWith('PM'))) {
                cron.schedule(buildCronStr(timeStr), async () : Promise<void> => {
                    let factResult : any
                    await fetch('http://dog-api.kinduff.com/api/facts')
                        .then((response : Response) : any => response.json())
                        .then((data : any) : void => factResult = data)
                        .catch((error : any) : void => console.error('Error: ', error))
                    
                    let imageResult : any
                    await fetch('https://dog.ceo/api/breeds/image/random')
                        .then((response : Response) : any => response.json())
                        .then((data : any) : void => imageResult = data)
                        .catch((error : any) : void => console.error('Error: ', error))

                    const messageEmbed : EmbedBuilder = new EmbedBuilder()
                        .setTitle('**__Daily Dog Fact__**')
                        .setDescription(factResult.facts[0])
                        .setColor(EMBEDCOLOR)
                        .setImage(imageResult.message)
                    
                    
                    await message.channel.send({ embeds : [messageEmbed] })
                })
                await message.channel.send(`**Channel successfully set to recieve a random dogfact daily at __${timeStr}__**`)
            }
        }
    }
)