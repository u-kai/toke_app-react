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
        paticipants: string[]
    }
    eventsInfos: EventsInfos
}

export type UIInfoActionType = 'getHomeEvents'
export const UIInfoReducer = (
    state: UIInfo,
    action: { type: UIInfoActionType; homeEvents?: HomeEvents; eventInfo?: EventInfo }
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
    }
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
