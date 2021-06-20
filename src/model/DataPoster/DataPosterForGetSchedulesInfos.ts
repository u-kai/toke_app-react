import { DataPoster } from 'model/DataPoster/DataPoster'
const url = 'getSchedules/ids'
const postKeys = ['userId']

export class DataPosterForGetSchedulesInfos extends DataPoster {
    constructor(userId: string) {
        super(url, postKeys, [userId])
    }
}
