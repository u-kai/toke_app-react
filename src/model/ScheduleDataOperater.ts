import { BackendReturn } from "types/backend-return-tyeps/BackendReturn"
import { SelectInfo } from "types/post-data-types/SelectInfo"
import {SelectResult} from "types/backend-return-tyeps/SelectResult"
import { postAndReturnResponseToJson } from "functions/postAndReturnResponseToJson"
import {SQLError} from "types/backend-return-tyeps/SQLError"
import { WhereOperator } from "types/post-data-types/WhereOperator"
export class ScheduleDataOperater{
    private userId:string
    private tableName:string
    private selectUrl:"select"
    constructor(userId:string){
        this.userId = userId
        this.tableName = 'user_attendance_requests_info'
        this.selectUrl = "select"
    }
    private isError = (error?: SQLError | undefined):boolean => {
        return error !== undefined
    }
    private isResults = (results:SelectResult | undefined):results is SelectResult => {
        return results !== undefined
    }
    private makeSelectInfo = (selectDatas:string[],whereKeys:string[],whereValues:string[],whereOperators:WhereOperator[]):SelectInfo => {
        return {
            selectDatas:selectDatas,
            tableName:this.tableName,
            whereClaseElements:{
                whereKeys:whereKeys,
                whereValues:whereValues,
                whereOperators:whereOperators
            }
        }
    }
    private makeCountSelectInfo = ():SelectInfo =>{
        return this.makeSelectInfo(["count(*)"],['user_id', 'is_response'],
        [this.userId, 'false'],['AND'])
    }
    private returnCount = (select: SelectResult | undefined):string => {
        if(this.isResults(select)){
            return Object.values(select[0]).toString()
        }
        return "Error"
    }
    returnPromiseCount = ():Promise<string> => {
        console.log(this.makeCountSelectInfo())
        return postAndReturnResponseToJson(this.makeCountSelectInfo(),this.selectUrl)
        .then((results:BackendReturn)=>{
            console.log(results.results.select)
            console.log(this.returnCount(results.results.select))
            return this.returnCount(results.results.select)
            }
        )
    }
}