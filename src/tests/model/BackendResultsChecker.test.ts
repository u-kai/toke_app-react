import { BackendResultsChecker } from 'model/BackendResultsChecker'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'

const errorResults: BackendReturn = {
    status: 400,
    results: {
        error: { code: '400', sqlMessage: 'error test', sqlState: '', errno: 0 },
    },
}
const backendResultsCheckerCaseError = new BackendResultsChecker(errorResults)
const isErrorCaseError = backendResultsCheckerCaseError.isError()
const isSelectCaseError = backendResultsCheckerCaseError.isSelect()
const isOtherCaseError = backendResultsCheckerCaseError.isOther()
it('test case error', () => {
    expect(isErrorCaseError).toBe(true)
    expect(isSelectCaseError).toBe(false)
    expect(isOtherCaseError).toBe(false)
})

const selectResult: BackendReturn = {
    status: 200,
    results: {
        select: [
            { user: 'kai', age: 18 },
            { user: 'kai', age: 25 },
        ],
    },
}
const backendResultsCheckerCaseSelect = new BackendResultsChecker(selectResult)
const isErrorCaseSelect = backendResultsCheckerCaseSelect.isError()
const isSelectCaseSelect = backendResultsCheckerCaseSelect.isSelect()
const isOtherCaseSelect = backendResultsCheckerCaseSelect.isOther()
it('test case select', () => {
    expect(isErrorCaseSelect).toBe(false)
    expect(isSelectCaseSelect).toBe(true)
    expect(isOtherCaseSelect).toBe(false)
})

const otherResult: BackendReturn = {
    status: 200,
    results: {
        other: {
            info: '',
            insertId: 2,
            warningStatus: 2,
            changedRows: 2,
            affectedRows: 2,
            fieldCount: 2,
            serverStatus: 2,
        },
    },
}
const backendResultsCheckerCaseOther = new BackendResultsChecker(otherResult)
const isErrorCaseOther = backendResultsCheckerCaseOther.isError()
const isSelectCaseOther = backendResultsCheckerCaseOther.isSelect()
const isOtherCaseOther = backendResultsCheckerCaseOther.isOther()
it('test case Other', () => {
    expect(isErrorCaseOther).toBe(false)
    expect(isSelectCaseOther).toBe(false)
    expect(isOtherCaseOther).toBe(true)
})
