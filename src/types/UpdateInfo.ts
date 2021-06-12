import { WhereClauseElements } from 'type/WhereClauseElements'
export type UpdateInfo = {
    tableName: string
    updateKeys: string[]
    updateValues: string[]
    whereClauseElements: WhereClauseElements
}
