import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Login } from '../components/pages/Login'
import { homeRoutes } from './HomeRoutes'
export const Router = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route
                path="/"
                render={({ match: { url } }) => (
                    <Switch>
                        {homeRoutes.map((route) => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={`${url}${route.path}`}
                                children={route.children}
                            />
                        ))}
                    </Switch>
                )}
            />
        </Switch>
    )
}
