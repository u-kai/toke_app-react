import { DisplayType, HomeEvents } from 'types/generated/graphql'

export type EventInfo = {
    event_id: string
    purpose: string
    date: string
    location: string
    describes: string
    bring: string
    organizer_id: string
    organizer_name: string
    start_date: string
    end_date: string
}
type EventsInfos = {
    notResInfo: EventInfo[]
    resedInfo: EventInfo[]
    attendEventInfo: EventInfo[]
    todayEventInfo: EventInfo[]
    requestEventInfo: EventInfo[]
}
type UIInfo = {
    displayInfo: {
        displayEventId?: string
        displayType: DisplayType
        event?: EventInfo
        paticipants?: string[]
    }
    eventsInfos: EventsInfos
}

export type UIInfoActionType = 'getHomeEvents' | 'clickEvent' | 'clickMyRequest' | 'createNewEvent'
export const UIInfoReducer = (
    state: UIInfo,
    action: {
        type: UIInfoActionType
        homeEvents?: HomeEvents
        eventInfo?: EventInfo
        event_id?: string
        paticipantNames?: string[]
    }
) => {
    switch (action.type) {
        case 'getHomeEvents': {
            if (action.homeEvents) {
                const homeEvents = action.homeEvents
                state.eventsInfos = {
                    notResInfo: homeEvents.notResEvent,
                    resedInfo: homeEvents.resedEvent,
                    requestEventInfo: homeEvents.requestEvent,
                    attendEventInfo: homeEvents.attendEvent,
                    todayEventInfo: [],
                }
                if (homeEvents.displayEvent.event && homeEvents.displayEvent.paticipants) {
                    state.displayInfo = {
                        displayEventId: homeEvents.displayEvent.event.event_id,
                        displayType: homeEvents.displayEvent.type,
                        event: homeEvents.displayEvent.event,
                        paticipants: homeEvents.displayEvent.paticipants.map((p) => p.user_name),
                    }
                }
            }
            return { ...state }
        }
        case 'clickEvent': {
            if (action.event_id && action.paticipantNames) {
                state.displayInfo = {
                    displayType: DisplayType.Myevent,
                    displayEventId: action.event_id,
                    event: idToDisplayEventInfo(action.event_id, state.eventsInfos),
                    paticipants: action.paticipantNames,
                }
                return { ...state }
            }
            return {
                ...state,
            }
        }
        case 'clickMyRequest': {
            if (action.event_id && action.paticipantNames) {
                state.displayInfo = {
                    displayType: DisplayType.Editevent,
                    displayEventId: action.event_id,
                    event: idToDisplayEventInfo(action.event_id, state.eventsInfos),
                    paticipants: action.paticipantNames,
                }
                return { ...state }
            }
            return { ...state }
        }
        case 'createNewEvent': {
            state.displayInfo = {
                displayType: DisplayType.Newevent,
                displayEventId: undefined,
                event: undefined,
                paticipants: undefined,
            }
            return { ...state }
        }
    }
}
const idToDisplayEventInfo = (id: string, infos: EventsInfos) => {
    const numberOfLengthOver0 = Object.values(infos).filter((info) => info.length > 0)
    if (numberOfLengthOver0.length > 0) {
        const allEventInfo = numberOfLengthOver0.flat()
        return allEventInfo.filter((info) => info.event_id.toString() === id.toString())[0]
    }
    return
}
export const initState: UIInfo = {
    eventsInfos: {
        notResInfo: [],
        attendEventInfo: [],
        requestEventInfo: [],
        resedInfo: [],
        todayEventInfo: [],
    },
    displayInfo: {
        displayEventId: undefined,
        displayType: DisplayType.Newevent,
        event: undefined,
        paticipants: [],
    },
}
