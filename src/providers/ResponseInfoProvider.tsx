import React, { useReducer, createContext, VFC } from 'react'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'

type ActionType = 'selectAttend' | 'selectAbsent' | 'inputMessage' | 'setState'| "setInit"
type ResponseInfo = {
    isAttend:boolean
    responseMessage:string
    choiceMessage:'欠席を選択されています．' | '出席を選択されています．'
    isPush:{
        attend:boolean
        absent:boolean
    }
}

type ResponseInfoContextType = {
    responseInfo:ResponseInfo
    responseInfoDispatch:React.Dispatch<{
        type:ActionType
        value?:string
        setState?:{
            isAttend:boolean
            responseMessage:string
        }
    }>
}
const initState:ResponseInfo = {
    isAttend:false,
    responseMessage:'欠席します．',
    choiceMessage:"欠席を選択されています．",
    isPush:{
        attend:false,
        absent:true
    }
}
const reducer = (state:ResponseInfo,action:{type:ActionType,value?:string,setState?:{
    isAttend:boolean
    responseMessage:string
}}):ResponseInfo => {
    switch(action.type){
        case "selectAttend":
            return {...state,isAttend:true,responseMessage:"出席します．",isPush:{
                attend:true,absent:false
            },choiceMessage:"出席を選択されています．"}
        case "selectAbsent":
            return {...state,isAttend:false,responseMessage:"欠席します．",isPush:{
                attend:false,absent:true
            },choiceMessage:"欠席を選択されています．"}
        case "inputMessage":
            return {...state,responseMessage:action.value!}
        case "setInit":
            return initState
        case "setState":
            return {...state,isAttend:action.setState!.isAttend,responseMessage:action.setState!.responseMessage,
            isPush:{
                absent:!action.setState!.isAttend,
                attend:action.setState!.isAttend
            },choiceMessage:action.setState!.isAttend ? "出席を選択されています．":"欠席を選択されています．"}
    }
}

export const ResponseInfoContext = createContext<ResponseInfoContextType>({} as ResponseInfoContextType)
export const ResponseInfoProvider:VFC<ChildrenProps> = (props) => {
    const {children} = props
    const [responseInfo,responseInfoDispatch] = useReducer(reducer,initState)
    return <ResponseInfoContext.Provider value={{responseInfo,responseInfoDispatch}}>
        {children}
    </ResponseInfoContext.Provider>
}