import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { EMBEDCOLOR } from '../classes/Constants'
import Command from '../classes/Command'

/**
 * Command to get a random drink from the thecocktaildb api
 */

export const command : Command = new Command(
    'drink',
    'Get a random alcoholic drink recipe',
    /**
     * Function for handling the drink slash command interaction
     * @param interaction The interaction that was performed
     */
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        let result : any
        // retry fetching a random drink if the drink returned is non alcoholic
        do {
            await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then((response : Response) : any => response.json())
                .then((data : any) : void => result = data)
                .catch((error : any) : void => console.error('Error: ', error))
        } while(result.strAlcoholic == 'Non Alcoholic')

        // make sure that the result actually contains a drink
        if(!result.drinks || result.drinks.length == 0) {
            await interaction.reply({ content : 'Something went wrong', ephemeral : true })
            console.error('Error: ', result)
            return
        }

        // constant to hold the selected drink from the api
        const drink : any = result.drinks[0]
        // The content string of the reply
        const replyContent : string = `**${interaction.user} Why not give this drink a try?**`

        // create the description of the reply's embed
        let embedDescription : string = '**__Ingredients List__**\n'
        for(let i : number = 0; i < 15; ++i) {
            if(drink[`strIngredient${i+1}`] != null) {
                embedDescription += drink[`strIngredient${i+1}`]
                if(drink[`strMeasure${i+1}`] != null) embedDescription += ` : ${drink[`strMeasure${i+1}`]}\n`
            } else break
        }
        embedDescription += `\n**__Instructions__**\n${drink.strInstructions}`

        // create the embed
        const replyEmbed : EmbedBuilder = new EmbedBuilder()
            .setTitle(`**${drink.strDrink}**`)
            .setImage(drink.strDrinkThumb)
            .setColor(EMBEDCOLOR)
            .setDescription(embedDescription)

        // reply to the interaction once everything is done
        await interaction.reply({ content : replyContent, embeds : [replyEmbed] })
    }
)