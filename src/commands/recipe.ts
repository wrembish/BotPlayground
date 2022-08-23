import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { EMBEDCOLOR } from '../classes/Constants'
import Command from '../classes/Command'

/**
 * Command to get a random recipe from the themealdb api
 */

export const command : Command = new Command(
    'recipe',
    'Get a random recipe recommendation :)',
    /**
     * Function for handling the recipe slash command interaction
     * @param Interaction The interaction that was performed
     */
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        let result : any
        await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then((response : Response) : any => response.json())
            .then((data : any) : void => result = data)
            .catch((error : any) : void => console.error('Error: ', error))

        // Make sure the result actually contains a recipe
        if(!result.meals || result.meals.length == 0) {
            await interaction.reply({ content : 'Something went wrong', ephemeral : true })
            console.error('Error: ', result)
            return
        }

        // Constant to hold the selected recipe from the api
        const recipe : any = result.meals[0]
        // The content string of the reply
        const replyContent : string = `**${interaction.user} Why not give this recipe a try?**`

        // Create description of the reply embed
        let embedDescription : string = '**__Ingredients List__**\n'
        for(let i : number = 0; i < 20; ++i) {
            if(recipe[`strIngredient${i+1}`]) {
                embedDescription += recipe[`strIngredient${i+1}`]
                if(recipe[`strMeasure${i+1}`]) embedDescription += ` : ${recipe[`strMeasure${i+1}`]}\n`
                else embedDescription += '\n'
            } else break
        }
        embedDescription += `\n**__Instructions__**\n${recipe.strInstructions}`

        // Create the embed
        const replyEmbed : EmbedBuilder = new EmbedBuilder()
            .setTitle(`**${recipe.strMeal}**`)
            .setImage(recipe.strMealThumb)
            .setColor(EMBEDCOLOR)
            .setDescription(embedDescription)

        // Reply to the interaction once everything is setup
        await interaction.reply({ content : replyContent, embeds : [replyEmbed] })
    }
)