import React, { useReducer, createContext, VFC } from 'react'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'

type UserState = {
    userId: string
    userName: string
}
type ActionType = 'inputId' | 'inputName'
const reducer = (state: UserState, action: { type: ActionType; value: string }) => {
    switch (action.type) {
        case 'inputId':
            return { ...state, userId: action.value }
        case 'inputName':
            return { ...state, userName: action.value }
    }
}
type UserIdContextType = {
    userInfo: UserState
    dispatch: React.Dispatch<{
        type: ActionType
        value: string
    }>
}
const initState: UserState = {
    userId: '3',
    userName: '',
}
export const UserIdContext = createContext<UserIdContextType>({} as UserIdContextType)
export const UserIdProvider: VFC<ChildrenProps> = (props) => {
    const { children } = props
    const [userInfo, dispatch] = useReducer(reducer, initState)
    return <UserIdContext.Provider value={{ userInfo, dispatch }}>{children}</UserIdContext.Provider>
}
