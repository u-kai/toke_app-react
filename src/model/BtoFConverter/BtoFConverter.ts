import { BackendResultsChecker } from 'model/BackendResultsChecker'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ReturnDataForNoticeSuccess } from 'types/backend-return-tyeps/ReturnDataForNoticeSuccess'
import { SelectResult } from 'types/backend-return-tyeps/SelectResult'

export class BtoFConverter {
    backendReturnData: BackendReturn
    checker: BackendResultsChecker
    constructor(backendReturnData: BackendReturn) {
        this.backendReturnData = backendReturnData
        this.checker = new BackendResultsChecker(this.backendReturnData)
    }
    returnError = (errorMessage?: string): string | '' => {
        if (!errorMessage) {
            errorMessage = 'error! something wrong'
        }
        if (this.checker.isError()) {
            return errorMessage
        }
        return ''
    }
    returnSelectResults = (): SelectResult | undefined => {
        if (this.checker.isSelect()) {
            return this.backendReturnData.results.select
        }
    }
    returnSuccessResults = (): ReturnDataForNoticeSuccess | undefined => {
        if (this.checker.isSuccess()) {
            return this.backendReturnData.results.success
        }
        if (this.checker.isOther()) {
            return [{ success: 'success' }]
        }
    }
    returnEmpty = (): string | undefined => {
        if (this.checker.isEmpty()) {
            return ''
        }
    }
}
