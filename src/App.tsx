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
import { UserEventsProvider } from 'providers/UserEvents'
import { DisplayEventProvider } from 'reducers/DisplayEvent'
import { AllUserProvider } from 'providers/AllUser'
export const App: React.VFC = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <AllUserProvider>
                <UserIdProvider>
                    <DisplayEventProvider>
                        <UserEventsProvider>
                            <ResponseInfoProvider>
                                <IsAttendAndMessageProvider>
                                    <BannerMessageProvider>
                                        <BrowserRouter>
                                            <Route exact path="/" component={Login} />
                                            <Route exact path="/home" component={Home} />
                                            <Route exact path="/newRegistUser" component={NewRegistUser} />
                                        </BrowserRouter>
                                    </BannerMessageProvider>
                                </IsAttendAndMessageProvider>
                            </ResponseInfoProvider>
                        </UserEventsProvider>
                    </DisplayEventProvider>
                </UserIdProvider>
            </AllUserProvider>
        </ApolloProvider>
    )
}
