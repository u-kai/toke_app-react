import { useGetPaticipantsLazyQuery } from 'types/generated/graphql'

export const useGetPaticipants = () => {
    const [getPaticipants, { data }] = useGetPaticipantsLazyQuery()
    const paticipants = data
    return {
        getPaticipants,
        paticipants,
    }
}
