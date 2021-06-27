import React from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { BrowserRouter, Route } from 'react-router-dom'
import { NewRegistUser } from 'components/pages/NewRegistUser'
import { Home } from 'components/pages/Home'
import { Login } from 'components/pages/Login'
import { UserIdContext, UserIdProvider } from 'providers/UserIdProvider'
import { BannerMessageProvider } from 'providers/BannerMessage'
export default function App() {
    return (
        <UserIdProvider>
            <BannerMessageProvider>
                <RecoilRoot>
                    <BrowserRouter>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/newRegistUser" component={NewRegistUser} />
                    </BrowserRouter>
                </RecoilRoot>
            </BannerMessageProvider>
        </UserIdProvider>
    )
}
