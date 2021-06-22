import { DataPosterForResponseAttendance } from "model/DataPoster/DataPosterForResponseAttendance"
import {StateMakerForNewSomething} from "model/StateMaker/StateMakerForNewSomething"

export class StateMakerForResponseAttendance extends StateMakerForNewSomething{
    constructor(url:"newAttendResponseRegist"| "changeResponse",userId:string,attendanceRequestId:string,isAttend:boolean,message:string){
        super(new DataPosterForResponseAttendance(
            url,
            userId,
            attendanceRequestId,
            isAttend,
            message
        ))
    }
}