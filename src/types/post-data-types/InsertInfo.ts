import { WhereClauseElements } from 'types/post-data-types/WhereClauseElements'
export type InsertInfo = {
    tableName: string
    insertKeys: string[]
    insertValues: string[]
    whereClauseElements: WhereClauseElements
}
