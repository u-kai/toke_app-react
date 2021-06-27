import React, { useReducer, createContext, VFC } from 'react'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'

type ActionType = 'selectAttend' | 'selectAbsent' | 'inputMessage' | 'setState'

type IsAttendAndMessageStateType = {
    isAttend: boolean
    responseMessage: string
}
type IsAttendAndMessageContextType = {
    isAttendAndMessage: IsAttendAndMessageStateType
    isAttendAndMessageDispatch: React.Dispatch<{
        type: ActionType
        value?: string
        setState?: IsAttendAndMessageStateType
    }>
}
const reducer = (
    state: IsAttendAndMessageStateType,
    action: { type: ActionType; value?: string; setState?: IsAttendAndMessageStateType }
): IsAttendAndMessageStateType => {
    switch (action.type) {
        case 'inputMessage':
            return { ...state, responseMessage: action.value! }
        case 'selectAbsent':
            return { ...state, responseMessage: '欠席します．', isAttend: false }
        case 'selectAttend':
            return { ...state, responseMessage: '出席します．', isAttend: true }
        case 'setState':
            return { ...state, responseMessage: action.setState!.responseMessage, isAttend: action.setState!.isAttend }
    }
}

const initState: IsAttendAndMessageStateType = {
    isAttend: false,
    responseMessage: '欠席します．',
}
export const IsAttendAndMessageContext = createContext<IsAttendAndMessageContextType>(
    {} as IsAttendAndMessageContextType
)
export const IsAttendAndMessageProvider: VFC<ChildrenProps> = (props) => {
    const { children } = props
    const [isAttendAndMessage, isAttendAndMessageDispatch] = useReducer(reducer, initState)
    return (
        <IsAttendAndMessageContext.Provider value={{ isAttendAndMessage, isAttendAndMessageDispatch }}>
            {children}
        </IsAttendAndMessageContext.Provider>
    )
}
