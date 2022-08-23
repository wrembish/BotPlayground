import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { EMBEDCOLOR } from '../classes/Constants'
import Command from '../classes/Command'

/**
 * Command to get a random cat gif sent to the channel
 */

export const command : Command = new Command(
    'catgif',
    'Get a random cat gif',
    /**
     * Function for handling the catgif slash command interaction
     * @param interaction The interaction that was performed
     */
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        let result : any
        await fetch('https://cataas.com/cat/gif?json=true')
            .then((response : Response) : any => response.json())
            .then((data : any) : void => result = data)
            .catch((error : any) : void => console.error('Error: ', error))

        if(result) await interaction.reply({ embeds : [new EmbedBuilder().setImage(`https://cataas.com${result.url}`).setColor(EMBEDCOLOR)]})
        else await interaction.reply({ content : 'There was an error while executing this command', ephemeral : true })
    }
)