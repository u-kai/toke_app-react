import {BackendResultsChecker} from "model/BackendResultsChecker"
import { BackendReturn } from "types/backend-return-tyeps/BackendReturn"

export class BtoFConverter{
    backendReturnData:BackendReturn
    checker:BackendResultsChecker
    constructor(backendReturnData:BackendReturn){
        this.backendReturnData =backendReturnData
        this.checker = new BackendResultsChecker(this.backendReturnData)
    }
    returnError = ():string|"" => {
        if(this.checker.isError()){
            return "something error code"
        }
        return ""
    }
    // returnSelectResults = ():ReturnDataForCount | ReturnDataForLogin | ReturnDataForScheduleInfo | ReturnDataForGetMembers | [{success:string}]
}