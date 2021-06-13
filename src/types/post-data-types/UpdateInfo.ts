import { WhereClauseElements } from 'types/post-data-types/WhereClauseElements'
export type UpdateInfo = {
    tableName: string
    updateKeys: string[]
    updateValues: string[]
    whereClauseElements: WhereClauseElements
}
