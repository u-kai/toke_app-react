import { WhereOperator } from 'type/WhereOperator'
export type WhereClauseElements = {
    whereKeys: string[]
    whereValues: string[]
    whereOperators: WhereOperator[]
}
