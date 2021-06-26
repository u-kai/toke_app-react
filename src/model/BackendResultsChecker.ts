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
    isSuccess = () => {
        if (this.backendResults.results.success) {
            return true
        }
        return false
    }
    isEmpty = () => {
        if(this.backendResults.results.error?.sqlMessage === "データが見つかりませんでした．"){
            return true
        }
        return false
    }
}
