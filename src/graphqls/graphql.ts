import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({}),
})
export const apolloClient = client
