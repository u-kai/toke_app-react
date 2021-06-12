import { WhereClauseElements } from 'type/WhereClauseElements'
export type InsertInfo = {
    tableName: string
    insertKeys: string[]
    insertValues: string[]
    whereClauseElements: WhereClauseElements
}
