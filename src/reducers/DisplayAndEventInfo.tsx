import { DateChecker } from 'model/DateChecker'
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
    displayEventId?: string
    infos: EventInfos
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
    | 'insertNotReseds'
    | 'insertReseds'
    | 'insertAttendEvents'
    | 'insertTodayEvents'
    | 'insertMyRequests'
    | 'initializeDisplay'

const idToDisplayEventInfo = (id: string, infos: EventInfos) => {
    const numberOfLengthOver0 = Object.values(infos).filter((info) => info.length > 0)
    if (numberOfLengthOver0.length > 0) {
        const allEventInfo = numberOfLengthOver0.flat()
        return allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
    }
    return
}

const returnInfoForInitDisplay = (infos: EventInfos): ScheduleInfo | undefined => {
    if (infos.notResInfo.length > 0) {
        return infos.notResInfo[0]
    }
    if (infos.todayEventInfo.length > 0) {
        return infos.todayEventInfo[0]
    }
    if (infos.resedInfo.length > 0) {
        return infos.resedInfo[0]
    }
    return
}
export const displayAndEventInfoInitState: DisplayAndEventInfo = {
    displayEventId: '',
    infos: {
        notResInfo: [],
        resedInfo: [],
        attendEventInfo: [],
        todayEventInfo: [],
        requestEventInfo: [],
    },
    displayComponentsType: 'response',
}
export const displayAndEventInfoReducer = (
    state: DisplayAndEventInfo,
    action: {
        type: EventInfoActionType
        id?: string
        info?: ScheduleInfoResults
    }
): DisplayAndEventInfo => {
    switch (action.type) {
        case 'insertReseds':
            state.infos.resedInfo = [...action.info!]
            return { ...state }
        case 'insertNotReseds':
            state.infos.notResInfo = [...action.info!]
            return { ...state }
        case 'insertAttendEvents':
            state.infos.attendEventInfo = [...action.info!]
            return { ...state }
        case 'insertMyRequests':
            state.infos.requestEventInfo = [...action.info!]
            return { ...state }
        case 'insertTodayEvents': {
            const dateChecker = new DateChecker()
            console.log("what happen",state.infos.attendEventInfo.map(data=>dateChecker.isToday(data.start_date)))
            const todayInfo = state.infos.attendEventInfo.filter(data => dateChecker.isToday(data.start_date))
            state.infos.todayEventInfo = [...todayInfo]
            console.log("state",state)
            console.log("today",todayInfo)
            return { ...state, }
        }
        case 'initializeDisplay':
            if (returnInfoForInitDisplay(state.infos) !== undefined) {
                return {
                    ...state,
                    displayComponentsType: 'response',
                    displayEventInfo: returnInfoForInitDisplay(state.infos),
                    displayEventId: returnInfoForInitDisplay(state.infos)!.attendance_request_id,
                }
            }
            return { ...state, displayComponentsType: 'newRequest', displayEventId: '' }
        case 'selectResed':
            return {
                ...state,
                displayEventId: action.id!,
                displayComponentsType: 'response',
                displayEventInfo: idToDisplayEventInfo(action.id!, state.infos),
            }
        case 'selectNotResed':
            return {
                ...state,
                displayEventId: action.id!,
                displayComponentsType: 'response',
                displayEventInfo: idToDisplayEventInfo(action.id!, state.infos),
            }
        case 'selectAttendEvent':
            return {
                ...state,
                displayEventId: action.id!,
                displayComponentsType: 'response',
                displayEventInfo: idToDisplayEventInfo(action.id!, state.infos),
            }
        case 'selectTodayEvent':
            return {
                ...state,
                displayEventId: action.id!,
                displayComponentsType: 'response',
                displayEventInfo: idToDisplayEventInfo(action.id!, state.infos),
            }
        case 'selectMyRequest':
            return {
                ...state,
                displayEventId: action.id!,
                displayComponentsType: 'editRequest',
                displayEventInfo: idToDisplayEventInfo(action.id!, state.infos),
            }
        case 'createNewRequest':
            return {
                ...state,
                displayEventId: undefined,
                displayComponentsType: 'newRequest',
                displayEventInfo: undefined,
            }
        default:
            return displayAndEventInfoInitState
    }
}
