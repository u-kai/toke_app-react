import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { NewRegistUser } from 'components/pages/NewRegistUser'
import { Home } from 'components/pages/Home'
import { Login } from 'components/pages/Login'
import {  UserIdProvider } from 'providers/UserIdProvider'
import { BannerMessageProvider } from 'providers/BannerMessage'
import { IsAttendAndMessageProvider } from 'providers/IsAttendAndMessage'
import { ResponseInfoProvider } from 'providers/ResponseInfoProvider'
import { GraphUserReg } from 'components/pages/NewRegiGraph'
export default function App() {
    return (
        <UserIdProvider>
            <ResponseInfoProvider>
                <IsAttendAndMessageProvider>
                    <BannerMessageProvider>
                            <BrowserRouter>
                                <Route exact path="/" component={Login} />
                                <Route exact path="/home" component={Home} />
                                <Route exact path="/newRegistUser" component={NewRegistUser} />
                                {/* <GraphUserReg></GraphUserReg> */}
                            </BrowserRouter>
                    </BannerMessageProvider>
                </IsAttendAndMessageProvider>
            </ResponseInfoProvider>
        </UserIdProvider>
    )
}
