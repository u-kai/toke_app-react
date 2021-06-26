import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'getRequests'
const postKeys = ['userId']

export class DataPosterForGetRequests extends DataPoster {
    constructor(userId: string) {
        super(url, postKeys, [userId])
    }
}
