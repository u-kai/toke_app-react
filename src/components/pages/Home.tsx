import React, { useEffect, useContext, useCallback, useReducer, useState } from 'react'
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
import { ResponseInfoContext } from 'providers/ResponseInfoProvider'
import { useUserName } from 'hocks/useUserName'
import { useDisplayEventInfo } from 'hocks/useDisplayEventInfo'
import { useResponseInfo } from 'hocks/useResponseInfo'
import { useParticipants } from 'hocks/useParitcipants'
import { DisplayType, useGetHomeEventsLazyQuery } from 'types/generated/graphql'
import { useSendRequestSubscriptionKai } from 'hocks/useSendRequestSubscription'
import { initState, UIInfoReducer } from 'reducers/UIInfo'
import { useGetPaticipants } from 'hocks/useGetPaticipants'
import { useGetPaticipantsAndResponse } from 'hocks/useGetPaticipnatsAndResponse'
export const Home = (): JSX.Element => {
    const [uiInfoState, uiInfoStateDispatch] = useReducer(UIInfoReducer, initState)
    const { fetchAndSetResponseInfo } = useResponseInfo()
    const { fetchAndSetAllEvent, displayAndEventInfoDispatch, displayAndEventInfo, fetchAndSetRequestInfo } =
        useDisplayEventInfo()
    const { fetchAndSetUserName } = useUserName()
    //const { participants, getPariticipants } = useParticipants()
    const userContext = useContext(UserIdContext)
    const bannerMessageContext = useContext(BannerMessageContext)
    const { userInfo, dispatch } = userContext
    const responseInfoContext = useContext(ResponseInfoContext)
    const { responseInfoDispatch } = responseInfoContext
    const { bannerMessage } = bannerMessageContext
    const { subscriptionData } = useSendRequestSubscriptionKai(userInfo.userId)
    const [getHomeEvents, { data }] = useGetHomeEventsLazyQuery()
    const [event_id, setEvent_id] = useState('')
    const [clickType, setClickType] = useState<'clickEvent' | 'clickMyRequest'>('clickEvent')
    const { getPAndR, pAndR } = useGetPaticipantsAndResponse()
    const onClickToEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const event_id = e.currentTarget.id
        getPAndR({
            variables: {
                event_id: event_id,
                user_id: userInfo.userId,
            },
        })
        setClickType('clickEvent')
        setEvent_id(event_id)
    }
    useEffect(() => {
        if (pAndR?.getPaticipantsAndMyResponse?.paticipants) {
            const paticipantsInfo = pAndR?.getPaticipantsAndMyResponse?.paticipants
            const paticipantNames = paticipantsInfo.map((pInfo) => pInfo.user_name)
            uiInfoStateDispatch({ type: clickType, event_id, paticipantNames })
            if (pAndR?.getPaticipantsAndMyResponse.response) {
                const res = pAndR?.getPaticipantsAndMyResponse.response
                console.log('res', res)
                responseInfoDispatch({
                    type: 'setState',
                    setState: {
                        isAttend: res.is_attendance,
                        responseMessage: res.message,
                    },
                })
            }
            if (!pAndR.getPaticipantsAndMyResponse.response) {
                console.log('inint')
                responseInfoDispatch({
                    type: 'setInit',
                })
            }
            return
        }
        return
    }, [event_id])
    useEffect(() => {
        if (data) {
            uiInfoStateDispatch({ type: 'getHomeEvents', homeEvents: data.getHomeEvents })
            return
        }
        return
    }, [data])
    const onClickToRequest = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const event_id = e.currentTarget.id
        getPAndR({
            variables: {
                event_id: event_id,
                user_id: userInfo.userId,
            },
        })
        setClickType('clickMyRequest')
        setEvent_id(event_id)
    }
    const onClickToCreateNewEvent = useCallback(() => {
        uiInfoStateDispatch({ type: 'createNewEvent' })
    }, [])

    const initHome = (): Promise<void> => {
        return new Promise((resolve) => {
            fetchAndSetAllEvent(userInfo.userId)
            displayAndEventInfoDispatch({ type: 'initializeDisplay' })
            fetchAndSetUserName(userInfo.userId)
            fetchAndSetRequestInfo(userInfo.userId)
            resolve()
        })
    }
    const displaySuccessAtSec = (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                initHome()
                resolve()
            }, 1000)
        })
    }

    useEffect(() => {
        getHomeEvents({ variables: { userId: userInfo.userId } })
    }, [userInfo.userId])

    useEffect(() => {
        if (bannerMessage.message === '送信が完了しました' || bannerMessage.message === '返信が成功しました！') {
            displaySuccessAtSec()
        }
    }, [bannerMessage.status])

    useEffect(() => {
        displayAndEventInfoDispatch({ type: 'initializeDisplay' })
    }, [
        displayAndEventInfo.infos.resedInfo,
        displayAndEventInfo.infos.notResInfo,
        displayAndEventInfo.infos.requestEventInfo,
    ])
    //
    //    useEffect(() => {
    //        if (displayAndEventInfo.displayEventId !== undefined && displayAndEventInfo.displayEventId !== null) {
    //            console.log(displayAndEventInfo.displayEventId)
    //            getPariticipants(displayAndEventInfo.displayEventId)
    //        }
    //    }, [displayAndEventInfo.displayEventId])

    const changeUserId = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: 'inputId', value: e.target.value })
    }

    return (
        <Container>
            <FooterContainer>
                <PrimarySearchAppBar value={userInfo.userId} onChange={changeUserId}></PrimarySearchAppBar>
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
                {data !== undefined ? (
                    <NestedMailList
                        notResMailsInfo={uiInfoState.eventsInfos.notResInfo}
                        resedMailsInfo={uiInfoState.eventsInfos.resedInfo}
                        requestMailsInfo={uiInfoState.eventsInfos.requestEventInfo}
                        onClickToNotRes={onClickToEvent}
                        onClickToResed={onClickToEvent}
                        onClickToRequest={onClickToRequest}
                    />
                ) : (
                    <NestedMailList
                        notResMailsInfo={[]}
                        resedMailsInfo={[]}
                        requestMailsInfo={[]}
                        onClickToNotRes={onClickToEvent}
                        onClickToResed={onClickToEvent}
                        onClickToRequest={onClickToRequest}
                    />
                )}
            </MailContainer>
            <EventInfoContainer>
                {uiInfoState.displayInfo.displayType === DisplayType.Newevent ? (
                    <EventEdit />
                ) : (
                    <>
                        {uiInfoState.displayInfo.displayType === DisplayType.Editevent ? (
                            <EventEdit
                                info={uiInfoState.displayInfo.event}
                                participants={uiInfoState.displayInfo.paticipants}
                            />
                        ) : null}
                    </>
                )}
                {uiInfoState.displayInfo.event !== undefined &&
                uiInfoState.displayInfo.displayType === DisplayType.Myevent &&
                uiInfoState.displayInfo.paticipants ? (
                    <EventInfo
                        info={uiInfoState.displayInfo.event}
                        participants={uiInfoState.displayInfo.paticipants}
                    ></EventInfo>
                ) : null}
            </EventInfoContainer>
            <NextEventContainer>
                <NestedScheduleList
                    todayScheduleInfo={uiInfoState.eventsInfos.todayEventInfo}
                    allScheduleInfo={uiInfoState.eventsInfos.attendEventInfo}
                    onClickToDetail={onClickToEvent}
                />
            </NextEventContainer>
            {uiInfoState.displayInfo.displayType === DisplayType.Myevent &&
            uiInfoState.displayInfo.displayEventId !== undefined ? (
                <ResponseContainer>
                    <ResponseComponent eventId={uiInfoState.displayInfo.displayEventId}></ResponseComponent>
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
