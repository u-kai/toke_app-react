import React, { createContext, useReducer } from 'react'
import { DisplayEventInfoFragment } from 'types/generated/graphql'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'

export type UserEvents = {
    attend: DisplayEventInfoFragment[]
    today: DisplayEventInfoFragment[]
    responsed: DisplayEventInfoFragment[]
    notResponsed: DisplayEventInfoFragment[]
    created: DisplayEventInfoFragment[]
}

export type UserEventsActionType = 'init'

const reducer = (
    userEvents: UserEvents,
    action: { type: UserEventsActionType; initEvents?: UserEvents }
): UserEvents => {
    const { type, initEvents } = action
    switch (type) {
        case 'init':
            if (initEvents) {
                return initEvents
            }
            throw new Error('init action type is initEvent arg is must')
        default:
            return userEvents
    }
}

const initUserEvent: UserEvents = {
    attend: [],
    today: [],
    responsed: [],
    notResponsed: [],
    created: [],
}
type UserEventsContextType = {
    userEvents: UserEvents
    userEventsDispatch: React.Dispatch<{
        type: UserEventsActionType
        initEvents?: UserEvents
    }>
}

export const UserEventsContext = createContext<UserEventsContextType>({} as UserEventsContextType)

export const UserEventsProvider: React.VFC<ChildrenProps> = (props) => {
    const { children } = props
    const [userEvents, userEventsDispatch] = useReducer(reducer, initUserEvent)
    return (
        <UserEventsContext.Provider value={{ userEvents, userEventsDispatch }}>{children}</UserEventsContext.Provider>
    )
}
