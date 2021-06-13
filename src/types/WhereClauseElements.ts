import { WhereOperator } from 'types/WhereOperator'
export type WhereClauseElements = {
    whereKeys: string[]
    whereValues: string[]
    whereOperators: WhereOperator[]
}
