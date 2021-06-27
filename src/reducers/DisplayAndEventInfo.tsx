import { DateChecker } from "model/DateChecker"
import {useReducer} from "react"
import { ScheduleInfo, ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
type EventInfoSource = {
    url: 'getNotRes' | 'getResed' | 'getEvent'
    info: ScheduleInfoResults
    huck: React.Dispatch<React.SetStateAction<ScheduleInfoResults>>
}
type EventInfos = {
    notResInfo: ScheduleInfoResults
    resedInfo: ScheduleInfoResults
    attendEventInfo: ScheduleInfoResults
    todayEventInfo: ScheduleInfoResults
    requestEventInfo: ScheduleInfoResults
}
type DisplayAndEventInfo = {
    displayEventId: string
    infos:EventInfos
    displayEventInfo?: ScheduleInfo
    displayComponentsType: 'editRequest' | 'response' | 'newRequest'
}
export type EventInfoActionType =
    | 'selectNotResed'
    | 'selectResed'
    | 'selectAttendEvent'
    | 'selectTodayEvent'
    | 'selectMyRequest'
    | 'createNewRequest'
    | "insertNotReseds"
    | "insertReseds"
    | "insertAttendEvents"
    | "insertTodayEvents"
    | "insertMyRequests"
    | "initializeDisplay"

const initState:DisplayAndEventInfo = {
    displayEventId:"",
    infos:{
        notResInfo:[],
        resedInfo:[],
        attendEventInfo:[],
        todayEventInfo:[],
        requestEventInfo:[],
    },
    displayComponentsType:"response"
}
const idToDisplayEventInfo = (id: string,infos:EventInfos) => {
    const numberOfLengthOver0 = Object.values(infos).filter(info=>info.length > 0)
    if (numberOfLengthOver0.length > 0) {
        const allEventInfo = infos.notResInfo.concat(infos.resedInfo, infos.requestEventInfo, infos.attendEventInfo)
        return allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
    }
    return
}


const returnInfoForInitDisplay = (infos:EventInfos):ScheduleInfo|undefined => {
    if(infos.notResInfo.length > 0){
        return infos.notResInfo[0]
    }
    if(infos.todayEventInfo.length > 0) {
        return infos.todayEventInfo[0]
    }
    if (infos.resedInfo.length > 0){
        return infos.resedInfo[0]
    }
    return 
}
const reducer = (state:DisplayAndEventInfo,action:{
    type:EventInfoActionType
    id?:string
    info?:ScheduleInfoResults
}):DisplayAndEventInfo => {
    switch(action.type){
        case "insertReseds":
            state.infos.resedInfo = action.info!
            return {...state}
        case "insertNotReseds":
            state.infos.notResInfo = action.info!
            return {...state}
        case "insertAttendEvents":
            state.infos.attendEventInfo = action.info!
            return {...state}
        case "insertMyRequests":
            state.infos.requestEventInfo = action.info!
            return {...state}
        case "insertTodayEvents":{
            const dateChecker = new DateChecker()
            const todayInfo = state.infos.attendEventInfo.filter(data=>dateChecker.isToday(data.start_date))
            state.infos.todayEventInfo = todayInfo
            return {...state}
        }
        case "initializeDisplay":
            if(returnInfoForInitDisplay(state.infos) !== undefined){
                return {...state,displayComponentsType:"response",displayEventInfo:returnInfoForInitDisplay(state.infos),displayEventId:returnInfoForInitDisplay(state.infos)!.attendance_request_id}
            }
            return {...state,displayComponentsType:"newRequest",displayEventId:""}
        case "selectNotResed" || "selectResed" ||  "selectAttendEvent" || "selectTodayEvent":
            return {...state,displayEventId:action.id!,displayComponentsType:"response",displayEventInfo:idToDisplayEventInfo(action.id!,state.infos)}
        case "selectMyRequest":
            return {...state,displayEventId:action.id!,displayComponentsType:"editRequest",displayEventInfo:idToDisplayEventInfo(action.id!,state.infos)}
        case "createNewRequest":
            return {...state,displayEventId:"",displayComponentsType:"newRequest",displayEventInfo:undefined}
        default:
            return initState
    }
}

export const [displayAndEventInfo,displayAndEventInfoDispatch] = useReducer(reducer,initState)