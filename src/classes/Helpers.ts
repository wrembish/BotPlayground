import { ConversionMap } from "../index"

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

export function convert(strToConvert : string) : string {
    let output : string = ''
    for(const c of strToConvert.split('')) {
        const emojis : string[] | undefined = ConversionMap.get(c.toUpperCase())
        if(c == ' ') output += '     '
        else if(emojis) {
            output += emojis[Math.floor(Math.random() * emojis.length)]
        } else {
            console.error(`Character '${c}' is missing from the conversion map`)
            return 'There was an error while trying to convert this message'
        }
    }
    return output
}