import { DataPoster } from 'model/DataPoster/DataPoster'
const url = 'getGroups'
const postKeys = ['userId']
export class DataPosterForGetGroups extends DataPoster {
    constructor(userId: string) {
        super(url, postKeys, [userId])
    }
}
