import {DataPoster} from "model/DataPoster/DataPoster"

const url = "getPaticipants"
const postKeys = ["attendanceRequestId"]

export class DataPosterForGetParitcipants extends DataPoster{
    constructor(attendanceRequestId:string){
        super(url,postKeys,[attendanceRequestId])
    }
}