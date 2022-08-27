import { EmbedBuilder } from "discord.js"
import { ConversionMap } from "../index"
import { EMBEDCOLOR } from "./Constants"

/**
 * File for any methods/functions that may be used across multiple files
 *//*

----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
 
*//**
 * Function for converting a given string into a string of discord emojis
 * @param strToConvert The string that will be converted
 * @returns A string representing the given string as discord emojis or an error message
 */

export function convert(strToConvert: string): string {
    let output: string = ''
    for(const c of strToConvert.split('')) {
        const emojis: string[] | undefined = ConversionMap.get(c.toUpperCase())
        if (c == ' ') output += '     '
        else if (emojis) output += emojis[Math.floor(Math.random() * emojis.length)]
        else {
            console.error(`Character '${c}' is missing from the conversion map`)
            return 'There was an error while trying to convert this message'
        }
    }
    return output
}

export function buildCronStr(timeStr: string): string {
    let output: string = ''
    const timeOfDay: string = timeStr.endsWith('AM') ? 'AM' : 'PM'
    const timeSplit: Array<string> = timeStr.substring(0, timeStr.length - 2).split(':')

    output += timeSplit[1] + ' '

    if (timeSplit[0] == '12' && timeOfDay == 'AM') output += '0 '
    else if (timeSplit[0] == '12' && timeOfDay == 'PM') output += '12 '
    else if (timeOfDay == 'PM') output += (12 + parseInt(timeSplit[0])).toString() + ' '
    else output += timeSplit[0] + ' '

    output += '* * *'

    return output
}

export async function getDogFactsEmbed(): Promise<EmbedBuilder> {
    let factResult: any
    await fetch('http://dog-api.kinduff.com/api/facts')
        .then((response: Response): any => response.json())
        .then((data: any): void => factResult = data)
        .catch((error: any): void => console.error('Error: ', error))

    let imageResult: any
    await fetch('https://dog.ceo/api/breeds/image/random')
        .then((response: Response): any => response.json())
        .then((data: any): void => imageResult = data)
        .catch((error: any): void => console.error('Error: ', error))

    const messageEmbed: EmbedBuilder = new EmbedBuilder()
        .setTitle('**__Daily Dog Fact__**')
        .setDescription(factResult.facts[0])
        .setColor(EMBEDCOLOR)
        .setImage(imageResult.message)

    return messageEmbed
}