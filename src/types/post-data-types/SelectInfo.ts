import { WhereClauseElements } from 'types/post-data-types/WhereClauseElements'
export type SelectInfo = {
    tableName: string
    selectDatas?: string[]
    whereClaseElements: WhereClauseElements
}
