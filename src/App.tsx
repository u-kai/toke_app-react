import React from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { BrowserRouter, Route } from 'react-router-dom'
import { NewRegistUser } from 'components/pages/NewRegistUser'
import { Home } from 'components/pages/Home'
import { Login } from 'components/pages/Login'
import { UserIdContext, UserIdProvider } from 'providers/UserIdProvider'
import { BannerMessageProvider } from 'providers/BannerMessage'
import {IsAttendAndMessageProvider} from "providers/IsAttendAndMessage"
import { ResponseInfoProvider, ResponseInfoContext } from 'providers/ResponseInfoProvider'
export default function App() {
    return (
        <UserIdProvider>
            <ResponseInfoProvider>
            <IsAttendAndMessageProvider>
            <BannerMessageProvider>
                <RecoilRoot>
                    <BrowserRouter>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/newRegistUser" component={NewRegistUser} />
                    </BrowserRouter>
                </RecoilRoot>
            </BannerMessageProvider>
            </IsAttendAndMessageProvider>
            </ResponseInfoProvider>
        </UserIdProvider>
    )
}
