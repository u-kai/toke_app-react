import { StateMakerForResponseAttendance } from './StateMakerForResponseAttendance'

// const url = 'newAttendResponseRegist'
const url = 'changeResponse'
export class StateMakerForNewAttendanceResponseRegist extends StateMakerForResponseAttendance {
    constructor(userId: string, attendanceRequestId: string, isAttend: boolean, message: string) {
        super(url, userId, attendanceRequestId, isAttend, message)
    }
}
