import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'login'
const postKeys = ['userName', 'password']
export class DataPosterForLogin extends DataPoster {
    constructor(userName: string, password: string) {
        super(url, postKeys, [userName, password])
    }
}
