import {ScheduleInfoResults} from "types/backend-return-tyeps/ScheduleInfo"
export class ScheduleSepareter{
    schedules:ScheduleInfoResults
    constructor(schedules:ScheduleInfoResults){
        this.schedules = schedules
    }
    returnNotRes = ():ScheduleInfoResults => {
        return this.schedules.filter((s)=>s)
    }
}