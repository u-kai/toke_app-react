import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'newUserRegist'
const postKeys = ['userName', 'password']

export class DataPosterForNewUserRegist extends DataPoster {
    constructor(userName: string, password: string) {
        super(url, postKeys, [userName, password])
    }
}
