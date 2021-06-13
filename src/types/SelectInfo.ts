import { WhereClauseElements } from 'types/WhereClauseElements'
export type SelectInfo = {
    tableName: string
    selectDatas?: string[]
    whereClaseElements: WhereClauseElements
}
