import React, { useReducer, createContext, VFC } from 'react'
import { UserInfo } from 'types/generated/graphql'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'

type ActionType = 'inputId' | 'inputName' | 'successLogin'
const reducer = (state: UserInfo, action: { type: ActionType; value?: string; userInfo?: UserInfo }): UserInfo => {
    const { type, value, userInfo } = action
    switch (type) {
        case 'successLogin':
            if (userInfo) {
                return userInfo
            }
            throw new Error('userInfo is undefinde at UserInfo dispatch')
        case 'inputId':
            if (value !== undefined) {
                return { ...state, userId: value }
            }
            throw new Error('value is undefined at UserInfo dispatch')
        case 'inputName':
            if (value !== undefined) {
                return { ...state, userName: value }
            }
            throw new Error('value is undefined at UserInfo dispatch')
    }
}
type UserIdContextType = {
    userInfo: UserInfo
    dispatch: React.Dispatch<{
        type: ActionType
        value?: string
        userInfo?: UserInfo
    }>
}
const initState: UserInfo = {
    userId: '0',
    userName: '',
}
export const UserIdContext = createContext<UserIdContextType>({} as UserIdContextType)
export const UserIdProvider: VFC<ChildrenProps> = (props) => {
    const { children } = props
    const [userInfo, dispatch] = useReducer(reducer, initState)
    return <UserIdContext.Provider value={{ userInfo, dispatch }}>{children}</UserIdContext.Provider>
}
