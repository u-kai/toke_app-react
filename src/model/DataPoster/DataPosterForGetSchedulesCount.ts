import { DataPoster } from 'model/DataPoster/DataPoster'

const postKeys = ['userId']
export class DataPosterForGetSchedulesCount extends DataPoster {
    constructor(url:string,userId: string) {
        super(url, postKeys, [userId])
    }
}
