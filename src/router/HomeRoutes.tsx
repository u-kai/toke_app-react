import React from 'react'
import { Login } from 'components/pages/Login'
import { Home } from 'components/pages/Home'
export const homeRoutes = [
    {
        path: '',
        exact: true,
        children: <Login />,
    },
    {
        path: 'home',
        exact: false,
        children: <Home />,
    },
]
