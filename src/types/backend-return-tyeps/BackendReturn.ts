import { SQLError } from 'types/backend-return-tyeps/SQLError'
import { InsertUpdateDeleteResult } from './InsertUpdateDeleteResult'
import {SelectResult} from "types/backend-return-tyeps/SelectResult"
import {ReturnDataForNoticeSuccess} from "types/backend-return-tyeps/ReturnDataForNoticeSuccess"
export type BackendReturn = {
    status: number
    results: {
        error?: SQLError
        other?: InsertUpdateDeleteResult
        select?: SelectResult| [{success:string}]
        success?:ReturnDataForNoticeSuccess
    }
}
