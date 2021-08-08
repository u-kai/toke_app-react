import { useSendRequestSubscription, SendRequestSubscription } from 'types/generated/graphql'

export const useSendRequestSubscriptionKai = (
    userId: string
): { subscriptionData: SendRequestSubscription | undefined } => {
    const { data } = useSendRequestSubscription({ variables: { id: userId } })
    const subscriptionData = data
    return { subscriptionData }
}
