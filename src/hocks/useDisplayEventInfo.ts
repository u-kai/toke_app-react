import {
    displayAndEventInfoInitState,
    displayAndEventInfoReducer,
    EventInfoActionType,
} from 'reducers/DisplayAndEventInfo'
import { BannerMessageContext } from 'providers/BannerMessage'
import { useContext, useReducer } from 'react'
import { DateChecker } from 'model/DateChecker'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { StateMakerForGetRequestInfos } from 'model/StateMaker/StateMakerForGetRequestInfos'
type SetEventInfo = {
    url: 'getNotRes' | 'getResed' | 'getEvent'
    action: EventInfoActionType
}
const actionList: SetEventInfo[] = [
    {
        url: 'getNotRes',
        action: 'insertNotReseds',
    },
    {
        url: 'getResed',
        action: 'insertReseds',
    },
    {
        url: 'getEvent',
        action: 'insertAttendEvents',
    },
]
const dateChecker = new DateChecker()
export const useDisplayEventInfo = () => {
    const bannerContext = useContext(BannerMessageContext)
    const { bannerDispatch } = bannerContext
    const [displayAndEventInfo, displayAndEventInfoDispatch] = useReducer(
        displayAndEventInfoReducer,
        displayAndEventInfoInitState
    )
    const fetchAndSetEventInfo = (setEventInfo: SetEventInfo, userId: string) => {
        const stateMaker = new StateMakerForGetSchedulesInfo(setEventInfo.url, userId)
        stateMaker.returnErrorAndInfos().then((data) => {
            if (data.error !== '') {
                displayAndEventInfoDispatch({ type: setEventInfo.action, info: [] })
                bannerDispatch({ type: 'setError', value: data.error })
            }
            if (data.infos) {
                const sortList = dateChecker.sortInfo(data.infos)
                displayAndEventInfoDispatch({ type: setEventInfo.action, info: sortList })
                bannerDispatch({ type: 'resetMessage' })
            }
            if (data.infos === undefined) {
                displayAndEventInfoDispatch({ type: setEventInfo.action, info: [] })
                bannerDispatch({ type: 'resetMessage' })
            }
            return
        })
        return
    }
    const fetchAndSetAllEvent = (userId: string) => {
        actionList.map((actionInfo) => fetchAndSetEventInfo(actionInfo, userId))
        return
    }

    const fetchAndSetRequestInfo = (userId: string) => {
        const stateMakerforRequestInfo = new StateMakerForGetRequestInfos(userId)
        stateMakerforRequestInfo.returnErrorAndInfos().then((data) => {
            if (data.infos !== undefined) {
                displayAndEventInfoDispatch({ type: 'insertMyRequests', info: data.infos })
                bannerDispatch({ type: 'resetMessage' })
            }
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
            }
        })
    }

    return { fetchAndSetAllEvent, displayAndEventInfoDispatch, displayAndEventInfo, fetchAndSetRequestInfo }
}
