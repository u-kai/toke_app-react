import { WhereClauseElements } from 'types/WhereClauseElements'
export type UpdateInfo = {
    tableName: string
    updateKeys: string[]
    updateValues: string[]
    whereClauseElements: WhereClauseElements
}
