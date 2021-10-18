import React, { useEffect, useContext, useState } from 'react'
import { NestedMailList } from 'components/molecules/NestedMailList'
import { NestedScheduleList } from 'components/molecules/NestedScheduleList'
import styled from 'styled-components'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { PrimarySearchAppBar } from 'components/atoms/PrimarySearchAppBar'
import { MUIButton } from 'components/atoms/MUIButton'
import { EventInfo } from 'components/organisms/EventInfo'
import { ResponseComponent } from 'components/organisms/ReponseComponent'
import { EventEdit } from 'components/organisms/EventEdit'
import { UserIdContext } from 'providers/UserIdProvider'
import { BannerMessageContext } from 'providers/BannerMessage'
import { UserEvents, UserEventsContext } from 'providers/UserEvents'
import {
    DisplayEventInfoFragment,
    DisplayUserEventFragment,
    FetchHomeDataDocument,
    useChangeResponseMutation,
    useCommingEventSubscription,
    useFetchHomeDataQuery,
    useFetchUserAttendEventsLazyQuery,
    useFetchUserAttendEventsQuery,
    useFetchUserNotResponseEventsQuery,
    useFetchUserResponsedEventsQuery,
    useFetchUserTodayEventsQuery,
    UserEvent,
    UserInfo,
} from 'types/generated/graphql'
import { DisplayEvent, DisplayEventContext, initDisplayEvent } from 'reducers/DisplayEvent'
import { useHistory } from 'react-router-dom'
import { EventEditMode } from 'types/ui-types/EventEditMode'
import { AllUserContext } from 'providers/AllUser'
import { ResponseInfoContext } from 'providers/ResponseInfoProvider'
import { selectOneArray } from 'functions/selectOneArray'
const isEventEmpty = (eventsArray: DisplayEventInfoFragment[][]): boolean => {
    const over0Events = eventsArray.filter((events) => events.length > 0).flat()
    return over0Events.length === 0
}
const searchEvent = (eventsArray: DisplayUserEventFragment[][], eventId: string): DisplayUserEventFragment => {
    const event = eventsArray
        .map((events) => events.filter((event) => event.event.eventId === eventId))
        .filter((events) => events.length > 0)[0]
        .map((event) => {
            return {
                ...event,
                currentPaticipants: event.event.paticipantUsers,
            }
        })
    return event[0]
}

export const Home = (): JSX.Element => {
    const { setAllUser } = useContext(AllUserContext)
    const bannerMessageContext = useContext(BannerMessageContext)
    const { userInfo, dispatch } = useContext(UserIdContext)
    const [displayEventInfo, setDisplayEventInfo] = useState<DisplayUserEventFragment | undefined>(undefined)
    //    const { data, error } = useFetchHomeDataQuery({
    //        variables: {
    //            input: userInfo,
    //        },
    //    })
    const attendEvent = useFetchUserAttendEventsQuery({
        variables: {
            input: userInfo,
        },
    })
    const todayEvent = useFetchUserTodayEventsQuery({
        variables: {
            input: userInfo,
        },
    })
    const responsedEvent = useFetchUserResponsedEventsQuery({
        variables: {
            input: userInfo,
        },
    })
    const notResponseEvent = useFetchUserNotResponseEventsQuery({
        variables: {
            input: userInfo,
        },
    })

    const [events, setEvents] = useState<DisplayUserEventFragment[][]>([])
    //const { displayEvent, displayEventDispatch } = useContext(DisplayEventContext)
    const [isEventEdit, setIsEventEdit] = useState(false) //isEventEmpty([notResponsed, today, responsed, attend]))
    const { bannerMessage, bannerDispatch } = bannerMessageContext
    const [eventEditMode, setEventEditMode] = useState<EventEditMode>('editEvent')
    const { responseInfo } = useContext(ResponseInfoContext)
    const subscription = useCommingEventSubscription({ variables: { input: userInfo } })
    const [changeResponse] = useChangeResponseMutation({
        awaitRefetchQueries: true,
        refetchQueries: [FetchHomeDataDocument],
    })
    const postResponse = async () => {
        if (displayEventInfo === undefined) {
            return
        }
        const { isAttend, responseMessage } = responseInfo
        const { userId } = userInfo
        const { eventId } = displayEventInfo.event
        await changeResponse({
            variables: {
                input: {
                    response: {
                        isAttend,
                        isResponse: true,
                        message: responseMessage,
                        userId,
                        eventId,
                    },
                },
            },
        }).catch((e) => bannerDispatch({ type: 'setError', message: e.toString() }))
    }
    const history = useHistory()
    const onClickToEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const eventId = e.currentTarget.id
        setIsEventEdit(false)
        setDisplayEventInfo(searchEvent(events, eventId))
        //    displayEventDispatch({ type: 'change', newState: searchEvent(events, eventId) })
    }
    const onClickToCreateNewEvent = () => {
        //   displayEventDispatch({ type: 'init', userInfo })
        setIsEventEdit(true)
        setEventEditMode('newEvent')
        return
    }
    const changeUserId = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: 'inputId', value: e.target.value })
    }
    const onClickToMyCreated = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const eventId = e.currentTarget.id
        //  displayEventDispatch({ type: 'change', newState: searchEvent(events, eventId) })
        setDisplayEventInfo(searchEvent(events, eventId))
        setIsEventEdit(true)
        setEventEditMode('editEvent')
    }
    useEffect(() => {
        const { userId, userName } = userInfo
        if (userId === '' || userName === '') {
            bannerDispatch({ type: 'setError', message: '再度ログインしてください' })
            history.push('/')
        }
        if (userId && userName) {
            bannerDispatch({ type: 'resetMessage' })
        }
    }, [])
    useEffect(() => {
        const { data } = subscription
        if (data) {
            bannerDispatch({ type: 'setInfomation', message: data.newEvent.eventInfo.purpose + 'が発行されました' })
        }
    }, [subscription.data])
    useEffect(() => {
        const { data } = attendEvent
        if (data) {
            const events: DisplayUserEventFragment[] = data.userAttendEvents
            setEvents((prev) => {
                return [...prev, events]
            })
        }
    }, [attendEvent])

    useEffect(() => {
        const { data } = todayEvent
        if (data) {
            const events: DisplayUserEventFragment[] = data.userTodayEvents
            setEvents((prev) => {
                return [...prev, events]
            })
        }
    }, [todayEvent])

    useEffect(() => {
        const { data } = notResponseEvent
        if (data) {
            const events: DisplayUserEventFragment[] = data.userNotResponseEvents
            setEvents((prev) => {
                return [...prev, events]
            })
        }
    }, [notResponseEvent])

    useEffect(() => {
        const { data } = responsedEvent
        if (data) {
            const events: DisplayUserEventFragment[] = data.userResponsedEvents
            setEvents((prev) => {
                return [...prev, events]
            })
        }
    }, [responsedEvent])

    //useEffect(() => {
    //if (error) {
    //bannerDispatch({ type: 'setError', message: error.message })
    //return
    //}
    //if (data) {
    //const { notResponseEvents, attendEvents, responsedEvents, todayEvents, createdEvents } = data.user
    //const { allUserInfos } = data
    //setAllUser(allUserInfos)
    //const eventsArray = [notResponseEvents, attendEvents, responsedEvents, todayEvents, createdEvents]
    //setEvents(eventsArray)
    //const initEvents: UserEvents = {
    //notResponsed: notResponseEvents,
    //attend: attendEvents,
    //responsed: responsedEvents,
    //today: todayEvents,
    //created: createdEvents,
    //}
    //userEventsDispatch({ type: 'init', initEvents })
    //setIsEventEdit(isEventEmpty([notResponseEvents, attendEvents, responsedEvents, todayEvents]))
    //displayEventDispatch({ type: 'change', newState: makeInitDisplayEvent(eventsArray, userInfo) })
    //}
    //}, [data, error])
    return (
        <Container>
            <FooterContainer>
                <PrimarySearchAppBar value={userInfo.userId} onChange={changeUserId} />
            </FooterContainer>
            {bannerMessage.message !== '' && bannerMessage.message !== undefined ? (
                <BanerContainer>
                    <SimpleAlert message={bannerMessage.message} severity={bannerMessage.status}></SimpleAlert>
                </BanerContainer>
            ) : null}
            <MettingButtonContainer>
                <MUIButton label={'会議を設定する'} onClick={onClickToCreateNewEvent} color="primary" />
            </MettingButtonContainer>
            <MailContainer>
                {notResponseEvent !== undefined && responsedEvent !== undefined}
                <NestedMailList
                    notResMailsInfo={
                        notResponseEvent.data ? notResponseEvent.data.userNotResponseEvents.map((e) => e.event) : []
                    }
                    resedMailsInfo={
                        notResponseEvent.data ? notResponseEvent.data.userNotResponseEvents.map((e) => e.event) : []
                    }
                    requestMailsInfo={
                        notResponseEvent.data ? notResponseEvent.data.userNotResponseEvents.map((e) => e.event) : []
                    }
                    onClickToNotRes={onClickToEvent}
                    onClickToResed={onClickToEvent}
                    onClickToRequest={onClickToMyCreated}
                />
            </MailContainer>
            <EventInfoContainer>
                {isEventEdit ? <EventEdit eventEdit={eventEditMode} /> : <>{null}</>}
                {[] !== undefined && !isEventEdit ? (
                    <EventInfo
                        event={{
                            event: {
                                eventId: '0',
                                eventInfo: {
                                    bring: 'test2',
                                    purpose: 'test2',
                                    startDate: '2021-07-05T03:00:00.000Z',
                                    endDate: '2021-07-05T03:30:00.000Z',
                                    organizerId: '0',
                                    organizerName: '有働真樹',
                                    describes: 'test2',
                                    location: '',
                                },
                                requestedUsers: [
                                    {
                                        userId: '0',
                                        userName: 'udo',
                                    },
                                ],
                                paticipantUsers: [
                                    {
                                        userId: '0',
                                        userName: 'udo',
                                    },
                                ],
                            },
                            response: {
                                isAttend: true,
                                isResponse: true,
                                message: 'test',
                                userId: '0',
                            },
                        }}
                    ></EventInfo>
                ) : null}
            </EventInfoContainer>
            <NextEventContainer>
                <NestedScheduleList
                    todayScheduleInfo={[
                        {
                            eventId: '0',
                            eventInfo: {
                                bring: 'test2',
                                purpose: 'test2',
                                startDate: '2021-07-05T03:00:00.000Z',
                                endDate: '2021-07-05T03:30:00.000Z',
                                organizerId: '0',
                                organizerName: '有働真樹',
                                describes: 'test2',
                                location: '',
                            },
                            paticipantUsers: [
                                {
                                    userId: '0',
                                    userName: 'udo',
                                },
                            ],
                        },
                    ]}
                    allScheduleInfo={[
                        {
                            eventId: '0',
                            eventInfo: {
                                bring: 'test2',
                                purpose: 'test2',
                                startDate: '2021-07-05T03:00:00.000Z',
                                endDate: '2021-07-05T03:30:00.000Z',
                                organizerId: '0',
                                organizerName: '有働真樹',
                                describes: 'test2',
                                location: '',
                            },
                            paticipantUsers: [
                                {
                                    userId: '0',
                                    userName: 'udo',
                                },
                            ],
                        },
                    ]}
                    onClickToDetail={onClickToEvent}
                />
            </NextEventContainer>
            {!isEventEdit ? (
                <ResponseContainer>
                    <ResponseComponent onSendButtonClick={postResponse} />
                </ResponseContainer>
            ) : null}
        </Container>
    )
}

const MettingButtonContainer = styled.div`
    display: flex;
    margin-top: 30px;
    margin-left: 30px;
    align-items: center;
    grid-row: 2/3;
    grid-column: 1/2;
`
const Container = styled.div`
    width: 100%;
    height: 750px;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 9% 10% 48% 32%;
`
const FooterContainer = styled.div`
    // height:100%;
    grid-row: 1/2;
    grid-column: 1/4;
    // border: solid 1px gray;
    // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
`
const BanerContainer = styled.div`
    height: 100%;
    grid-row: 2/3;
    grid-column: 2/3;
    // border: solid 1px gray;
    // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 3px;
`
const MailContainer = styled.div`
    overflow: auto;
    height: 100%;
    grid-row: 3/4;
    grid-column: 1/2;
    // border: solid 1px gray;
    // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
const EventInfoContainer = styled.div`
    height: 100%;
    grid-row: 3/4;
    grid-column: 2/3;
    // border: solid 1px gray;
    // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
const NextEventContainer = styled.div`
    height: 100%;
    grid-row: 3/4;
    grid-column: 3/4;
    // border: solid 1px gray;
    // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
const ResponseContainer = styled.div`
    height: 100%;
    grid-row: 4/5;
    grid-column: 2/3;
    // border: solid 1px gray;
    // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
