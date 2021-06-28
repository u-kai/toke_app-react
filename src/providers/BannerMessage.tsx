import React, { useReducer, createContext, VFC } from 'react'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'
import { Banner } from 'types/ui-types/Banner'

type ActionType = 'setError' | 'setSuccess' | 'setInfomation'|"resetMessage"
type BannerMessageContextType = {
    bannerMessage: Banner
    bannerDispatch: React.Dispatch<{
        type: ActionType
        value?: string
    }>
}

const initState: Banner = {}
const reducer = (state: Banner, action: { type: ActionType; value?: string }): Banner => {
    switch (action.type) {
        case 'setError':
            return { ...state, status: 'error', message: action.value }
        case 'setSuccess':
            return { ...state, status: 'success', message: action.value }
        case "resetMessage":
            return {...state,status:undefined,message:undefined}
        default:
            return { ...state }
    }
}
export const BannerMessageContext = createContext<BannerMessageContextType>({} as BannerMessageContextType)

export const BannerMessageProvider: VFC<ChildrenProps> = (props) => {
    const { children } = props
    const [bannerMessage, bannerDispatch] = useReducer(reducer, initState)
    return (
        <BannerMessageContext.Provider value={{ bannerMessage, bannerDispatch }}>
            {children}
        </BannerMessageContext.Provider>
    )
}
