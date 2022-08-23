/**
 * Type for discord event files from the events directory
 */

export default class DiscordEvent {
    public name : string
    public once : boolean
    public execute : Function

    constructor(name : string, once : boolean, execute : Function) {
        this.name = name
        this.once = once
        this.execute = execute
    }
}