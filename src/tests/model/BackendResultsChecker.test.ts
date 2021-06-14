import {BackendResultsChecker} from "model/BackendResultsChecker"
import {BackendReturn} from "types/backend-return-tyeps/BackendReturn"

const errorResults:BackendReturn = {
    status: 400,
    results: {
        error: {code:"400",sqlMessage:"error test",sqlState:"",errno:0}
    }
}
const backendResultsChecker = new BackendResultsChecker(errorResults)
const isError = backendResultsChecker.isError()

it("test case error",()=>{
    expect(isError).toBe(true)
})