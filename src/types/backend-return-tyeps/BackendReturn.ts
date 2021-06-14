import { SQLError } from 'types/backend-return-tyeps/SQLError'
import { InsertUpdateDeleteResult } from './InsertUpdateDeleteResult'
import { SelectResult } from './SelectResult'
export type BackendReturn = {
    status: number
    results: {
        error?: SQLError
        other?: InsertUpdateDeleteResult
        select?: SelectResult
    }
}
