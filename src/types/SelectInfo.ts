import { WhereClauseElements } from 'type/WhereClauseElements'
export type SelectInfo = {
    tableName: string
    selectDatas?: string[]
    whereClaseElements: WhereClauseElements
}
