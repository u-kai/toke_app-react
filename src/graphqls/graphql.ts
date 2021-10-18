import { ApolloClient, InMemoryCache, split, createHttpLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            userInfo: '0',
        },
    },
})
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink
)
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({}),
})
export const apolloClient = client
