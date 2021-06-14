import {SQLError} from "types/backend-return-tyeps/SQLError"
import {BackendReturn} from "types/backend-return-tyeps/BackendReturn"

export class BackendResultsChecker{
    private backendResults:BackendReturn
    constructor(backendResults:BackendReturn){
        this.backendResults = backendResults
    }
    isError = () => {
        return this.backendResults.status === 400 || this.backendResults.results.error !== undefined
    }
    isSelect = () => {
        return this.backendResults.results.select !== undefined
    }
    isOther = () => {
        return this.backendResults.results.other !== undefined
    }

}