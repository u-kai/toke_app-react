import {DataPoster} from "model/DataPoster/DataPoster"


const postKeys = ["userId","attendanceRequestId","isAttend","message"]

export class DataPosterForResponseAttendance extends DataPoster{
    constructor(url:"newAttendResponseRegist"| "changesAttendanceResponse",userId:string,attendanceRequestId:string,isAttend:boolean,message:string){
        super(url,postKeys,[
            userId,
            attendanceRequestId,
            isAttend.toString(),
            message
        ])
    }
}