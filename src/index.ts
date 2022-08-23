require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { Client as DiscordClient, GatewayIntentBits, Collection, Awaitable } from 'discord.js'
import Command from './classes/Command'
import { MongoClient, ServerApiVersion, Collection as MongoCollection } from 'mongodb'
import { MAPCOLLECTION, MONGODATABASE } from './classes/Constants'

// Create the discord bot client
const discClient : DiscordClient = new DiscordClient({ intents : [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

// Create the slash command Collection
const cmmnds : Collection<string, Command> = new Collection<string, Command>()
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter((file : string) : boolean => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const { command } = require(filePath)
    cmmnds.set(command.data.name, command)
}

// Add the event handlers
const eventsPath : fs.PathLike = path.join(__dirname, 'events')
const eventFiles : string[] = fs.readdirSync(eventsPath).filter((file : string) : boolean => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of eventFiles) {
    const filePath : string = path.join(eventsPath, file)
    const { event } = require(filePath)
    if(event.once) discClient.once(event.name, (...args : any) : Awaitable<void> => event.execute(...args))
    else discClient.on(event.name, (...args : any) : Awaitable<void> => event.execute(...args))
}

// Create and connect to the mongodb Client
const map : Collection<string, string[]> = new Collection<string, string[]>()
let dbClient : MongoClient | undefined
if(process.env.MONGODB_URL) {
    dbClient = new MongoClient(process.env.MONGODB_URL, { serverApi : ServerApiVersion.v1 })
    dbClient.connect(async (error : any) : Promise<void> => {
        if(!error && dbClient) {
            console.log('Successfully connected to Database!')

            // get the conversion map from the database for converting messages into emojis
            const mapCollection : MongoCollection = dbClient.db(MONGODATABASE).collection(MAPCOLLECTION)
            const mapDocuments : any[] = await mapCollection.find({}).toArray()

            for(const doc of mapDocuments) {
                map.set(doc.char, doc.emojis)
            }

            console.log('Successfully got the conversion map from the database')
        } else {
            console.error(error)
            dbClient = undefined
        }
    })
}

// Login with the discord bot client
discClient.login(process.env.TOKEN)

// Export the commands and the mongodb Client
export const Commands : Collection<string, Command> = cmmnds
export const Database : MongoClient | undefined = dbClient
export const ConversionMap : Collection<string, string[]> = map