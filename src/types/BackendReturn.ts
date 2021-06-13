import {SQLError} from "types/SQLError"
import { InsertUpdateDeleteResult } from "./InsertUpdateDeleteResult"
import { SelectResult } from "./SelectResult"
export type BackendReturn = {
    status:number
    results:{
        error?:SQLError
        other?:InsertUpdateDeleteResult
        select?:SelectResult
    }
}