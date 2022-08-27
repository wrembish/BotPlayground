export default class CronJob {
    public ChannelId : string
    public CronStr : string
    public JobName : string

    constructor(channel : string, cron : string, job : string) {
        this.ChannelId = channel
        this.CronStr = cron
        this.JobName = job
    }
}