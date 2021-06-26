import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'getResed/responseInfo'
const postKeys = ['userId', 'eventId']

export class DataPosterForGetResponseInfo extends DataPoster {
    constructor(userId: string, eventId: string) {
        super(url, postKeys, [userId, eventId])
    }
}
