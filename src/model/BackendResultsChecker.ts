import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'

export class BackendResultsChecker {
    private backendResults: BackendReturn
    constructor(backendResults: BackendReturn) {
        this.backendResults = backendResults
    }
    isError = (): boolean => {
        return this.backendResults.status === 400 || this.backendResults.results.error !== undefined
    }
    isSelect = (): boolean => {
        if (this.backendResults.results.select) {
            return true
        }
        return false
    }
    isOther = (): boolean => {
        return this.backendResults.results.other !== undefined
    }
    isSuccess = (): boolean => {
        if (this.backendResults.results.success) {
            return true
        }
        return false
    }
    isEmpty = (): boolean => {
        if (this.backendResults.results.error?.sqlMessage === 'データが見つかりませんでした．') {
            return true
        }
        return false
    }
}
