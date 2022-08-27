import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'


export const command : Command = new Command(
    'dadjoke',
    'Get a random dad joke :)',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        let result : any
        await fetch('https://icanhazdadjoke.com/', { headers : { Accept: "application/json" }})
            .then((response : Response) : any => response.json())
            .then((data : any) : void => result = data)
            .catch((error : any) : void => console.error('Error: ', error))

        if(result && result.joke) await interaction.reply(result.joke)
        else await interaction.reply({ content : 'There was a problem executing this command', ephemeral : true })
    }
)