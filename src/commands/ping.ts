import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'ping',
    'Replies with Pong!',
    /**
     * Function for handling the ping slash command interaction
     * @param interaction The interaction that was performed
     */
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        // Reply to the slash command with the message 'Pong!'
        await interaction.reply('Pong!')
    }
)