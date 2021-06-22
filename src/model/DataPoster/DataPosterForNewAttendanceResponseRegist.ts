import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'newAttendResponseRegist'
const postKeys = ['userId', 'attendanceRequestId', 'isAttend', 'message']

export class DataPosterForNewAttendanceResponseRegist extends DataPoster {
    constructor(userId: string, attendanceRequestId: string, isAttend: boolean, message: string) {
        super(url, postKeys, [userId, attendanceRequestId, isAttend.toString(), message])
    }
}
