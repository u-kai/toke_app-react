import { DateChecker } from 'model/DateChecker'
import { EventInfoSource } from 'types/ui-types/EventInfoSource'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { BannerMessageContext } from 'providers/BannerMessage'
import { useContext } from 'react'
import { EventInfoActionType } from 'reducers/DisplayAndEventInfo'
import { ScheduleInfo, ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
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
export const fetchAndSetEventInfo = (
    setEventInfo: SetEventInfo,
    userId: string,
    dispatch: React.Dispatch<{
        type: EventInfoActionType
        id?: string | undefined
        info?: ScheduleInfoResults | undefined
    }>
) => {
    const stateMaker = new StateMakerForGetSchedulesInfo(setEventInfo.url, userId)
    stateMaker.returnErrorAndInfos().then((data) => {
        if (data.error !== '') {
            dispatch({ type: setEventInfo.action, info: [] })
            bannerDispatch({ type: 'setError', message: data.error })
        }
        if (data.infos) {
            const sortList = dateChecker.sortInfo(data.infos)
            dispatch({ type: setEventInfo.action, info: sortList })
        }
        return
    })
    return
}

export const fetchAndSetAllEvent = (
    userId: string,
    dispatch: React.Dispatch<{
        type: EventInfoActionType
        id?: string | undefined
        info?: ScheduleInfoResults | undefined
    }>
) => {
    actionList.map((actionInfo) => fetchAndSetEventInfo(actionInfo, userId, dispatch))
    return
}
