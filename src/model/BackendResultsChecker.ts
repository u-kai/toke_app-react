import { SQLError } from 'types/backend-return-tyeps/SQLError'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ScheduleInfo, ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'

export class BackendResultsChecker {
    private backendResults: BackendReturn
    constructor(backendResults: BackendReturn) {
        this.backendResults = backendResults
    }
    isError = () => {
        return this.backendResults.status === 400 || this.backendResults.results.error !== undefined
    }
    isSelect = () => {
        if (this.backendResults.results.select) {
            return true
        }
        return false
    }
    isOther = () => {
        return this.backendResults.results.other !== undefined
    }
    isForLogin = () => {
        // if(this.isSelect()){
        //     this.backendResults.results.select?.map((keyValue:)=>{
        //     })
        // }
        // if(this.backendResults.results.select){
        //     this.backendResults.results.select.map()
        // }
    }
}
