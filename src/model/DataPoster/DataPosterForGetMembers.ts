import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'getMembers'
const postKeys = ['userId']
export class DataPosterForGetMembers extends DataPoster {
    constructor(userId: string) {
        super(url, postKeys, [userId])
    }
}
