import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'getSchedules/count'
const postKeys = ['userId']
export class DataPosterForGetSchedulesCount extends DataPoster {
    constructor(userId: string) {
        super(url, postKeys, [userId])
    }
}
