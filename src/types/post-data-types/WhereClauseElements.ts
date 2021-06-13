import { WhereOperator } from 'types/post-data-types/WhereOperator'
export type WhereClauseElements = {
    whereKeys: string[]
    whereValues: string[]
    whereOperators: WhereOperator[]
}
