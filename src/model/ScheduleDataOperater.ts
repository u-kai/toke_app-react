import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { SelectResult } from 'types/backend-return-tyeps/SelectResult'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { SQLError } from 'types/backend-return-tyeps/SQLError'
import { WhereOperator } from 'types/post-data-types/WhereOperator'

export class ScheduleDataOperater {
    private userId: string
    private tableName: string
    private selectUrl: 'select'
    constructor(userId: string) {
        this.userId = userId
        this.tableName = 'user_attendance_requests_info'
        this.selectUrl = 'select'
    }
    private isError = (error?: SQLError | undefined): boolean => {
        return error !== undefined
    }
    private isResults = (results: SelectResult | undefined): results is SelectResult => {
        return results !== undefined && results.length > 0
    }
    private isStrings = (strings: (string | undefined)[]): strings is string[] => {
        const notUndefines = strings.filter((string) => string !== undefined)
        return notUndefines.length === strings.length
    }
    private makeSelectInfo = (
        selectDatas: string[],
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[],
        tableName?:string
    ): SelectInfo => {
        if(!tableName){
            tableName = this.tableName
        }
        return {
            selectDatas: selectDatas,
            tableName: tableName,
            whereClaseElements: {
                whereKeys: whereKeys,
                whereValues: whereValues,
                whereOperators: whereOperators,
            },
        }
    }
    private makeSelectInfoForCount = (): SelectInfo => {
        return this.makeSelectInfo(['count(*)'], ['user_id', 'is_response'], [this.userId, 'false'], ['AND'])
    }
    private makeSelectInfoForIds = ():SelectInfo => {
        return this.makeSelectInfo(['attendance_request_id'],['user_id', 'is_response'],[this.userId, 'false'],['AND'])
    }
    private makeSelectInfosForInfos = (ids:string[]):SelectInfo[] => {
        const selectInfos = ids.map((id)=>{
            return this.makeSelectInfo(["*"],["attendance_request_id"],[id],[],"attendance_requests")
        })
        return selectInfos
    }
    private returnCount = (select: SelectResult | undefined): string => {
        if (this.isResults(select)) {
            return Object.values(select[0]).toString()
        }
        return 'Error'
    }
    private returnIds = (select: SelectResult | undefined): string[]=>{
        if(this.isResults(select)){
            const ids = select.map((data)=>{
                const id = Object.values(data)[0]
                if(id !== null && id !== undefined){
                    return id.toString()
                }
            })
            if(this.isStrings(ids)){
                return ids
            }
        }
        return ["Error"]
    }
    private returnInfos = (select:SelectResult | undefined):SelectResult=>{
        if(this.isResults(select)){
            return select
        }
        return ([{
            "error":"error"
        }])
    }
    returnPromiseCount = (): Promise<string> => {
        return postAndReturnResponseToJson(this.makeSelectInfoForCount(), this.selectUrl).then(
            (results: BackendReturn) => {
                return this.returnCount(results.results.select)
            }
        )
    }
    private returnPromiseScheduleIds = ():Promise<string[]> => {
        return postAndReturnResponseToJson(this.makeSelectInfoForIds(),this.selectUrl)
        .then((results:BackendReturn)=>{
            console.log("attendanceIds",results.results.select)
            return this.returnIds(results.results.select)
        })
    }
    returnPromiseScheduleInfos = () => {
        this.returnPromiseScheduleIds()
        .then((ids:string[])=>{
            return postAndReturnResponseToJson(this.makeSelectInfosForInfos(ids),this.selectUrl+"/loop")
            .then((results:BackendReturn)=>{
                console.log("selects loop",results.results.select)
                return this.returnInfos(results.results.select)
            })
        })
    }
}
