import { FiberPinRounded } from '@material-ui/icons'
import { DataPoster } from 'model/DataPoster/DataPoster'

const postKeys = ['userId']

export class DataPosterForGetSchedulesInfos extends DataPoster {
    constructor(url: string, userId: string) {
        super(url, postKeys, [userId])
    }
}
