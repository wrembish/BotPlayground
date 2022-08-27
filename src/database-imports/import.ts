class Conversion {
  public char : String
  public emojis : string[]

  constructor(char : string, emojis : string[]) {
    this.char = char
    this.emojis = emojis
  }
}

const conversionMap : Conversion[] = [
  {
    char: '0',
    emojis: [':zero:']
  } as Conversion,
  {
    char: '1',
    emojis: [':one:', ':repeat_one:']
  } as Conversion,
  {
    char: '2',
    emojis: [':two:']
  } as Conversion,
  {
    char: '3',
    emojis: [':three:']
  } as Conversion,
  {
    char: '4',
    emojis: [':four:']
  } as Conversion,
  {
    char: '5',
    emojis: [':five:']
  } as Conversion,
  {
    char: '6',
    emojis: [':six:']
  } as Conversion,
  {
    char: '7',
    emojis: [':seven:']
  } as Conversion,
  {
    char: '8',
    emojis: [':eight:']
  } as Conversion,
  {
    char: '9',
    emojis: [':nine:']
  } as Conversion,
  {
    char: 'A',
    emojis: [':a:', ':regional_indicator_a:']
  } as Conversion,
  {
    char: 'B',
    emojis: [':b:', ':regional_indicator_b:']
  } as Conversion,
  {
    char: 'C',
    emojis: [
      ':regional_indicator_c:',
      ':copyright:'
    ]
  } as Conversion,
  {
    char: 'D',
    emojis: [':regional_indicator_d:']
  } as Conversion,
  {
    char: 'E',
    emojis: [':e_mail:', ':regional_indicator_e:']
  } as Conversion,
  {
    char: 'F',
    emojis: [':regional_indicator_f:']
  } as Conversion,
  {
    char: 'G',
    emojis: [
      ':regional_indicator_g:'
    ]
  } as Conversion,
  {
    char: 'H',
    emojis: [
      ':regional_indicator_h:'
    ]
  } as Conversion,
  {
    char: 'I',
    emojis: [
      ':regional_indicator_i:'
    ]
  } as Conversion,
  {
    char: 'J',
    emojis: [':regional_indicator_j:']
  } as Conversion,
  {
    char: 'K',
    emojis: [':regional_indicator_k:']
  } as Conversion,
  {
    char: 'L',
    emojis: [':regional_indicator_l:']
  } as Conversion,
  {
    char: 'M',
    emojis: [':m:', ':regional_indicator_m:']
  } as Conversion,
  {
    char: 'N',
    emojis: [':regional_indicator_n:']
  } as Conversion,
  {
    char: 'O',
    emojis: [':o:', ':regional_indicator_o:', ':o2:']
  } as Conversion,
  {
    char: 'P',
    emojis: [':parking:']
  } as Conversion,
  {
    char: 'Q',
    emojis: [':regional_indicator_q:']
  } as Conversion,
  {
    char: 'R',
    emojis: [':regional_indicator_r:']
  } as Conversion,
  {
    char: 'S',
    emojis: [':regional_indicator_s:']
  } as Conversion,
  {
    char: 'T',
    emojis: [':regional_indicator_t:']
  } as Conversion,
  {
    char: 'U',
    emojis: [
      ':regional_indicator_u:'
    ]
  } as Conversion,
  {
    char: 'V',
    emojis: [':regional_indicator_v:']
  } as Conversion,
  {
    char: 'W',
    emojis: [':regional_indicator_w:']
  } as Conversion,
  {
    char: 'X',
    emojis: [
      ':x:',
      ':heavy_multiplication_x:',
      ':regional_indicator_x:',
      ':negative_squared_cross_mark:'
    ]
  } as Conversion,
  {
    char: 'Y',
    emojis: [':regional_indicator_y:']
  } as Conversion,
  {
    char: 'Z',
    emojis: [':regional_indicator_z:', ':zzz:']
  } as Conversion,
  {
    char: '+',
    emojis: [':heavy_plus_sign:']
  } as Conversion,
  {
    char: '@',
    emojis: ['@']
  } as Conversion,
  {
    char: '?',
    emojis: [':question:', ':grey_question:']
  } as Conversion,
  {
    char: '.',
    emojis: ['.']
  } as Conversion,
  {
    char: '!',
    emojis: [':exclamation:', ':grey_exclamation:', ':heart_exclamation:']
  } as Conversion,
  {
    char: ',',
    emojis: [',']
  } as Conversion,
  {
    char: "'",
    emojis: ["'"]
  } as Conversion,
  {
    char: '/',
    emojis: ['/']
  } as Conversion,
  {
    char: '(',
    emojis: ['(']
  } as Conversion,
  {
    char: ')',
    emojis: [')']
  } as Conversion,
  {
    char: '>',
    emojis: ['>']
  } as Conversion,
  {
    char: '<',
    emojis: ['<']
  } as Conversion,
  {
    char: ':',
    emojis: [':']
  } as Conversion,
  {
    char: '_',
    emojis: ['_']
  } as Conversion,
  {
    char: '-',
    emojis: ['-']
  } as Conversion,
  {
    char: '#',
    emojis: ['#']
  } as Conversion
]

class Message {
  public label : string
  public message : string

  constructor(label : string, message : string) {
    this.label = label
    this.message = message
  }
}
const builtInMessages : Message[] = [
  {
    label: 'jawn',
    message: ':regional_indicator_j: :a: :regional_indicator_w: :regional_indicator_n:'
  } as Message,
  {
    label: 'ez',
    message: ':regional_indicator_e: :zzz:'
  } as Message,
  {
    label: 'ahhh',
    message: ':sob::mega::regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a:'
  } as Message
]

require('dotenv').config()
import { MongoClient, ServerApiVersion } from 'mongodb'
import { MONGODATABASE, MAPCOLLECTION,MESSAGESCOLLECTION } from '../classes/Constants'

if(process.env.MONGODB_URL) {
  const client = new MongoClient(process.env.MONGODB_URL, { serverApi: ServerApiVersion.v1 })
  client.connect(async (error : any) : Promise<void> => {
    if (!error) {
      await client.db(MONGODATABASE).collection(MAPCOLLECTION).insertMany(conversionMap)
      await client.db(MONGODATABASE).collection(MESSAGESCOLLECTION).insertMany(builtInMessages)
      client.close()

      console.log('Successfully imported all data')
    } else console.error(error)
  })
}