import {BackendResultsChecker} from "model/BackendResultsChecker"
import { BackendReturn } from "types/backend-return-tyeps/BackendReturn"
import { ReturnDataForNoticeSuccess } from "types/backend-return-tyeps/ReturnDataForNoticeSuccess"
import { SelectResult } from "types/backend-return-tyeps/SelectResult"

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
    returnSelectResults = ():SelectResult|undefined => {
        if(this.checker.isSelect()){
            return this.backendReturnData.results.select
        }
    }
    returnSuccessResults = ():ReturnDataForNoticeSuccess|undefined =>{
        if(this.checker.isSuccess()){
            return this.backendReturnData.results.success
        }
    }
}