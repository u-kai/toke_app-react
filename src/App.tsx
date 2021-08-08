import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { NewRegistUser } from 'components/pages/NewRegistUser'
import { Home } from 'components/pages/Home'
import { Login } from 'components/pages/Login'
import { UserIdProvider } from 'providers/UserIdProvider'
import { BannerMessageProvider } from 'providers/BannerMessage'
import { IsAttendAndMessageProvider } from 'providers/IsAttendAndMessage'
import { ResponseInfoProvider } from 'providers/ResponseInfoProvider'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'graphqls/graphql'
import { Test } from 'components/pages/Test'
export const App: React.VFC = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <UserIdProvider>
                <ResponseInfoProvider>
                    <IsAttendAndMessageProvider>
                        <BannerMessageProvider>
                            {/* <BrowserRouter>
                                <Route exact path="/" component={Login} />
                                <Route exact path="/home" component={Home} />
                                <Route exact path="/newRegistUser" component={NewRegistUser} />
                            </BrowserRouter> */}
                            <Test></Test>
                        </BannerMessageProvider>
                    </IsAttendAndMessageProvider>
                </ResponseInfoProvider>
            </UserIdProvider>
        </ApolloProvider>
    )
}
