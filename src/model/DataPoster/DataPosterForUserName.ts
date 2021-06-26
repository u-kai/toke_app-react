import { DataPoster } from 'model/DataPoster/DataPoster'
const url = 'getUserName'
const postKeys = ['userId']
export class DataPosterForUserName extends DataPoster {
    constructor(userId: string) {
        super(url, postKeys, [userId])
    }
}
