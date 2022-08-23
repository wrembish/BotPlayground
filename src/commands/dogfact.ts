import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

/**
 * Command to get a random dog fact from https://kinduff.github.io/dog-api/
 */

export const command : Command = new Command(
    'dogfact',
    'Get a random fact about dogs',
    /**
     * Function for handling the dogfact slash command interaction
     * @param interaction The interaction that was performed
     */
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        let result : any
        // Get a random dog fact from the dog-api
        await fetch('http://dog-api.kinduff.com/api/facts')
            .then((response : Response) : any => response.json())
            .then((data : any) : void => result = data)
            .catch((error : any) : void => console.error('Error: ', error))

        // If a result is returned send it as a reply, otherwise show an error
        if(result) await interaction.reply(`**${result.facts[0]}**`)
        else await interaction.reply({ content : 'Something went wrong while executing this command.', ephemeral : true })
    }
)