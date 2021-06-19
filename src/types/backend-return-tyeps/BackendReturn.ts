import { SQLError } from 'types/backend-return-tyeps/SQLError'
import { InsertUpdateDeleteResult } from './InsertUpdateDeleteResult'
import { ReturnDataForGetMembers } from './ReturnDataForGetMembers'
import { ReturnDataForCount } from 'types/backend-return-tyeps/ReturnDataForCount'
import { ReturnDataForLogin } from 'types/backend-return-tyeps/ReturnDataForLogin'
import { ReturnDataForScheduleInfo } from 'types/backend-return-tyeps/ReturnDataForScheduleInfo'
export type BackendReturn = {
    status: number
    results: {
        error?: SQLError
        other?: InsertUpdateDeleteResult
        select?: ReturnDataForCount | ReturnDataForLogin | ReturnDataForScheduleInfo | ReturnDataForGetMembers | [{success:string}]
    }
}
