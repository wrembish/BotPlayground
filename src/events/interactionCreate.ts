import { Interaction } from 'discord.js'
import Command from '../classes/Command'
import DiscordEvent from '../classes/DiscordEvent'
import { Commands } from '../index'

export const event : DiscordEvent = new DiscordEvent(
    'interactionCreate',
    false,
    /**
     * Function to handle an interaction being performed in discord
     * @param interaction The interaction that was performed
     */
    async (interaction : Interaction) : Promise<void> => {
        // Ignore any interactions that aren't commands
        if(!interaction.isCommand()) return

        // Get the command source code from the commands Collection that was created on the client
        const command : Command | undefined = Commands.get(interaction.commandName)

        // If that command existed, try to execute it and catch any errors that may get thrown
        if(command) {
            try {
                await command.execute(interaction)
            } catch(error) {
                console.error(error)
                await interaction.reply({ content : 'There was an error while executing this command!', ephemeral : true })
            }
        }
    }
)