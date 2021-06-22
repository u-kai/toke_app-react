import { StateMakerForResponseAttendance } from './StateMakerForResponseAttendance'

const url = 'changeResponse'
export class StateMakerForChangeResponse extends StateMakerForResponseAttendance {
    constructor(userId: string, attendanceRequestId: string, isAttend: boolean, message: string) {
        super(url, userId, attendanceRequestId, isAttend, message)
    }
}
