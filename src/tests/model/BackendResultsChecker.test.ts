import {BackendResultsChecker} from "model/BackendResultsChecker"
import {BackendReturn} from "types/backend-return-tyeps/BackendReturn"

const errorResults:BackendReturn = {
    status: 400,
    results: {
        error: {code:"400",sqlMessage:"error test",sqlState:"",errno:0}
    }
}
const backendResultsCheckerCaseError = new BackendResultsChecker(errorResults)
const isErrorCaseError = backendResultsCheckerCaseError.isError()
const isSelectCaseError = backendResultsCheckerCaseError.isSelect()
it("test case error",()=>{
    expect(isErrorCaseError).toBe(true)
    expect(isSelectCaseError).toBe(false)
})

const selectResult:BackendReturn = {
    status:200,
    results:{
        select:[{user:"kai",age:18},{user:"kai",age:25}]
    }
}
const backendResultsCheckerCaseSelect = new BackendResultsChecker(selectResult)
const isErrorCaseSelect = backendResultsCheckerCaseSelect.isError()
const isSelectCaseSelect = backendResultsCheckerCaseSelect.isSelect()
it("test case select",()=>{
    expect(isErrorCaseSelect).toBe(false)
    expect(isSelectCaseSelect).toBe(true)
})