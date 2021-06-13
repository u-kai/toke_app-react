import { WhereClauseElements } from 'types/WhereClauseElements'
export type InsertInfo = {
    tableName: string
    insertKeys: string[]
    insertValues: string[]
    whereClauseElements: WhereClauseElements
}
