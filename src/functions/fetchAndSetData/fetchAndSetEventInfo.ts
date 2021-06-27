import { DateChecker } from 'model/DateChecker'
import { EventInfoSource } from 'types/ui-types/EventInfoSource'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { BannerMessageContext } from 'providers/BannerMessage'
import { useContext } from 'react'
import { displayAndEventInfo, displayAndEventInfoDispatch, EventInfoActionType } from 'reducers/DisplayAndEventInfo'
const bannerMessageContext = useContext(BannerMessageContext)
const { bannerMessage, bannerDispatch } = bannerMessageContext

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
        action: 'selectAttendEvent',
    },
]
const dateChecker = new DateChecker()
export const fetchAndSetEventInfo = (setEventInfo: SetEventInfo, userId: string) => {
    const stateMaker = new StateMakerForGetSchedulesInfo(setEventInfo.url, userId)
    stateMaker.returnErrorAndInfos().then((data) => {
        if (data.error !== '') {
            displayAndEventInfoDispatch({ type: setEventInfo.action, info: [] })
            bannerDispatch({ type: 'setError', value: data.error })
        }
        if (data.infos) {
            const sortList = dateChecker.sortInfo(data.infos)
            displayAndEventInfoDispatch({ type: setEventInfo.action, info: sortList })
        }
        return
    })
    return
}

export const fetchAndSetAllEvent = (userId: string) => {
    actionList.map((actionInfo) => fetchAndSetEventInfo(actionInfo, userId))
    return
}
