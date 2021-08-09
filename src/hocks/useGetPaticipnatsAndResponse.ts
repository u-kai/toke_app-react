import { useGetPaticipantsAndResponseLazyQuery } from 'types/generated/graphql'

export const useGetPaticipantsAndResponse = () => {
    const [getPAndR, { data }] = useGetPaticipantsAndResponseLazyQuery()
    const pAndR = data
    return { getPAndR, pAndR }
}
