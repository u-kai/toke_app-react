import { DateConverter } from 'model/DateConverter'
import { createContext, useReducer } from 'react'
import { DisplayEventInfoFragment, UserInfo } from 'types/generated/graphql'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'
import * as lodash from 'lodash'
import { dateCalculater } from 'functions/dateCalculater'

export type DisplyaEventAction =
    | 'init'
    | 'change'
    | 'inputLocation'
    | 'inputPurpose'
    | 'inputDescribes'
    | 'inputBring'
    | 'addPaticipants'
    | 'inputStartDate'
    | 'inputEndDate'
    | 'addPaticipant'
    | 'removePaticipant'

export type DisplayEvent = DisplayEventInfoFragment & {
    currentPaticipants: UserInfo[]
}
export const initDisplayEvent = (userInfo: UserInfo): DisplayEvent => {
    const { userId, userName } = userInfo
    const startDate: string = new DateConverter().forMaterialUI()
    const defaultEventTime = '00:30'
    const endDate: string = dateCalculater(startDate, defaultEventTime)

    return {
        eventId: '',
        eventInfo: {
            startDate,
            endDate,
            location: '',
            purpose: '',
            describes: '',
            bring: '',
            organizerId: userId,
            organizerName: userName,
        },
        paticipantUsers: [],
        currentPaticipants: [],
    }
}
type DisplayEventDispatch = React.Dispatch<{
    type: DisplyaEventAction
    newState?: DisplayEvent
    userInfo?: UserInfo
    paticipants?: UserInfo[]
    paticipant?: UserInfo
    value?: string
}>
const reducer = (
    event: DisplayEvent,
    action: {
        type: DisplyaEventAction
        newState?: DisplayEvent
        userInfo?: UserInfo
        value?: string
        paticipants?: UserInfo[]
        paticipant?: UserInfo
    }
): DisplayEvent => {
    const { value, type, newState, userInfo, paticipants, paticipant } = action
    const clone: DisplayEvent = lodash.cloneDeep(event)
    switch (type) {
        case 'init':
            if (userInfo === undefined) {
                throw new Error('not set userInfo')
            }
            return initDisplayEvent(userInfo)
        case 'change':
            if (!newState) {
                throw new Error('not set newState')
            }
            return newState
        case 'inputBring':
            if (value === undefined) {
                throw new Error('not set newState')
            }
            clone.eventInfo.bring = value
            return clone
        case 'inputPurpose':
            if (value === undefined) {
                throw new Error('not set newState')
            }
            clone.eventInfo.purpose = value
            return clone
        case 'inputStartDate':
            if (value === undefined) {
                throw new Error('not set newState')
            }
            clone.eventInfo.startDate = value
            return clone
        case 'inputEndDate':
            if (value === undefined) {
                throw new Error('not set newState')
            }
            clone.eventInfo.endDate = value
            return clone
        case 'inputDescribes':
            if (value === undefined) {
                throw new Error('not set newState')
            }
            clone.eventInfo.describes = value
            return clone
        case 'inputLocation':
            if (value === undefined) {
                throw new Error('not set newState')
            }
            clone.eventInfo.location = value
            return clone
        case 'addPaticipants':
            if (paticipants === undefined) {
                throw new Error('not set newState')
            }
            clone.paticipantUsers = paticipants
            return clone
        case 'addPaticipant':
            if (paticipant === undefined) {
                throw new Error('not paticipant set ')
            }
            clone.paticipantUsers = [...clone.paticipantUsers, paticipant]
            return clone
        case 'removePaticipant': {
            if (paticipant === undefined) {
                throw new Error('not paticipant set')
            }
            const newPaticipants = clone.paticipantUsers.filter(
                (paticipantInfo) => paticipantInfo.userId !== paticipant.userId
            )
            clone.paticipantUsers = newPaticipants
            return clone
        }
    }
}

type DisplayEventContextType = {
    displayEvent: DisplayEvent
    displayEventDispatch: DisplayEventDispatch
}

export const DisplayEventContext = createContext<DisplayEventContextType>({} as DisplayEventContextType)

export const DisplayEventProvider: React.VFC<ChildrenProps> = (props) => {
    const { children } = props

    const [displayEvent, displayEventDispatch] = useReducer(reducer, initDisplayEvent({ userId: '', userName: '' }))
    return (
        <DisplayEventContext.Provider value={{ displayEvent, displayEventDispatch }}>
            {children}
        </DisplayEventContext.Provider>
    )
}
