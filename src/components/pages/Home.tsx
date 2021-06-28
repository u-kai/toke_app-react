import React, { useEffect, useState, useReducer, useContext } from 'react'
import { SocketIo } from 'components/organisms/SocketIo'
import socketIOClient from 'socket.io-client'
import { NestedMailList } from 'components/molecules/NestedMailList'
import { NestedScheduleList } from 'components/molecules/NestedScheduleList'
import styled from 'styled-components'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { PrimarySearchAppBar } from 'components/atoms/PrimarySearchAppBar'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateChecker } from 'model/DateChecker'
import { MUIButton } from 'components/atoms/MUIButton'
import { EventInfo } from 'components/organisms/EventInfo'
import { ResponseComponent } from 'components/organisms/ReponseComponent'
import { StateMakerForGetResponse } from 'model/StateMaker/StateMakerForGetResponse'
import { StateMakerForUserName } from 'model/StateMaker/StateMakerForUserName'
import { StateMakerForGetRequestInfos } from 'model/StateMaker/StateMakerForGetRequestInfos'
import { EventEdit } from 'components/organisms/EventEdit'
import { UserIdContext } from 'providers/UserIdProvider'
import { BannerMessageContext } from 'providers/BannerMessage'
import { ResponseInfoContext } from 'providers/ResponseInfoProvider'
import { StateMakerForGetParticipants } from 'model/StateMaker/StateMakerForGetParticipants'
import { EventInfoSource } from 'types/ui-types/EventInfoSource'
import {useUserName} from "hocks/useUserName"
//import { fetchAndSetAllEvent } from 'functions/fetchAndSetData/fetchAndSetEventInfo'
// import { insertInitDisplay } from 'functions/fetchAndSetData/insertInitDisplay'
// import { displayAndEventInfoDispatch } from 'reducers/DisplayAndEventInfo'
import {useDisplayEventInfo} from "hocks/useDisplayEventInfo"
export const Home = () => {
    const {fetchAndSetAllEvent,displayAndEventInfoDispatch,displayAndEventInfo,fetchAndSetRequestInfo} = useDisplayEventInfo()
    const {fetchAndSetUserName} = useUserName()
    const userContext = useContext(UserIdContext)
    const bannerMessageContext = useContext(BannerMessageContext)
    const { userInfo, dispatch } = userContext
    const responseInfoContext = useContext(ResponseInfoContext)
    const { responseInfoDispatch } = responseInfoContext
    const { bannerMessage, bannerDispatch } = bannerMessageContext
    const [notResEventInfo, setNotResEventInfo] = useState<ScheduleInfoResults>([])
    const [resedEventInfo, setResedEventInfo] = useState<ScheduleInfoResults>([])
    const [attendEventInfo, setAttendEventInfo] = useState<ScheduleInfoResults>([])
    const [todayEventInfo, setTodayEventInfo] = useState<ScheduleInfoResults>([])
    const [requestsInfo, setRequestsInfo] = useState<ScheduleInfoResults>([])
    const [displayEventId, setDisplayEventId] = useState('')
    const [paticipants, setPaticipants] = useState(['0人'])
    const [displayComponents, setDisplayComponents] = useState<'editRequest' | 'response' | 'newRequest'>('response')
    const onClickToNotResed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        displayAndEventInfoDispatch({type:"selectNotResed",id:e.currentTarget.id})
        responseInfoDispatch({ type: 'selectAbsent' })
    }
    const onClickToRequest = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        displayAndEventInfoDispatch({type:"selectMyRequest",id:e.currentTarget.id})
    }
    const onClickToResed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        displayAndEventInfoDispatch({type:"selectResed",id:e.currentTarget.id})
        const stateMaker = new StateMakerForGetResponse(userInfo.userId, e.currentTarget.id)
        stateMaker.returnErrorAndResponseInfo().then((data) => {
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
                return
            }
            if(data.error === "") {
                responseInfoDispatch({
                    type: 'setState',
                    setState: {
                        isAttend: data.responseInfo.isAttend,
                        responseMessage: data.responseInfo.message,
                    },
                })
                bannerDispatch({type:"resetMessage"})
            }
            
        })
        
    }
    const createNewEvent = () => {
        // setDisplayComponents('newRequest')
        // setRequestsInfo([])
        displayAndEventInfoDispatch({type:"createNewRequest"})
    }
    // const fetchAndSetUserName = (userId: string) => {
    //     const stateMakerUserName = new StateMakerForUserName(userId)
    //     stateMakerUserName.returnErrorAndUserName().then((data) => {
    //         if (data.userName !== '') {
    //             dispatch({ type: 'inputName', value: data.userName })
    //         }
    //         if (data.error !== '') {
    //             bannerDispatch({ type: 'setError', value: data.error })
    //         }
    //     })
    // }
    // const fetchAndSetEventInfo = (eventInfoSource: EventInfoSource) => {
    //     const dateChecker = new DateChecker()
    //     const stateMaker = new StateMakerForGetSchedulesInfo(eventInfoSource.url, userInfo.userId)
    //     stateMaker.returnErrorAndInfos().then((data) => {
    //         if (data.infos === undefined) {
    //             eventInfoSource.huck([])
    //         }
    //         bannerDispatch({ type: 'setError', value: data.error })
    //         if (data.infos) {
    //             const sortList = dateChecker.sortInfo(data.infos)
    //             eventInfoSource.huck(sortList)
    //             if (eventInfoSource.url === 'getNotRes') {
    //                 setDisplayEventId(sortList[0].attendance_request_id)
    //             }
    //             if (eventInfoSource.url === 'getEvent') {
    //                 const todayInfos = data.infos?.filter((data) => dateChecker.isToday(data.start_date))
    //                 setTodayEventInfo(todayInfos)
    //             }
    //         }
    //     })
    // }
    // const fetchAndSetRequestInfo = (userId: string) => {
    //     const stateMakerforRequestInfo = new StateMakerForGetRequestInfos(userId)
    //     stateMakerforRequestInfo.returnErrorAndInfos().then((data) => {
    //         if (data.infos !== undefined) {
    //             setRequestsInfo(data.infos)
    //         }
    //         if (data.error !== '') {
    //             bannerDispatch({ type: 'setError', value: data.error })
    //         }
    //     })
    // }
    
    useEffect(() => {
        fetchAndSetAllEvent(userInfo.userId)
        displayAndEventInfoDispatch({ type: 'initializeDisplay' })
        displayAndEventInfoDispatch({ type: 'insertTodayEvents' })
        fetchAndSetUserName(userInfo.userId)
        fetchAndSetRequestInfo(userInfo.userId)
    }, [userInfo.userId])

    // const idToDisplayInfo = (id: string) => {
    //     if (notResEventInfo.length !== 0 || resedEventInfo.length !== 0 || requestsInfo.length !== 0) {
    //         const clone = Object.assign([], notResEventInfo)
    //         const allEventInfo = clone.concat(resedEventInfo, attendEventInfo, requestsInfo)
    //         return allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
    //     }
    // }
    const onClickToSchedule = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        displayAndEventInfoDispatch({type:"selectAttendEvent",id:e.currentTarget.id})
        const stateMaker = new StateMakerForGetResponse(userInfo.userId, e.currentTarget.id)
        stateMaker.returnErrorAndResponseInfo().then((data) => {
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
            }
            if (data.error === '') {
                responseInfoDispatch({
                    type: 'setState',
                    setState: {
                        isAttend: data.responseInfo.isAttend,
                        responseMessage: data.responseInfo.message,
                    },
                })
                bannerDispatch({type:"resetMessage"})
            }
        })
    }
    const getPariticipants = (attendanceRequestId: string) => {
        const stateMaker = new StateMakerForGetParticipants(attendanceRequestId)
        stateMaker.returnErrorAndParticipants().then((data) => {
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
            }
            if (data.error === '') {
                setPaticipants(data.participants)
            }
        })
    }
    const selectInitDisplayInfo = () => {
        if (notResEventInfo[0] !== undefined) {
            setDisplayEventId(notResEventInfo[0].attendance_request_id)
            return
        }
        if (resedEventInfo[0] !== undefined) {
            setDisplayEventId(resedEventInfo[0].attendance_request_id)
            return
        }
        if (requestsInfo[0] !== undefined) {
            setDisplayEventId(requestsInfo[0].attendance_request_id)
        }
    }
    useEffect(() => {
        displayAndEventInfoDispatch({type:"initializeDisplay"})
    }, [displayAndEventInfo.infos.resedInfo, displayAndEventInfo.infos.notResInfo, displayAndEventInfo.infos.requestEventInfo])

    useEffect(() => {
        if(displayAndEventInfo.displayEventId !== undefined){
            getPariticipants(displayAndEventInfo.displayEventId!)
        }
    }, [displayAndEventInfo.displayEventId])
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
                <MUIButton label={'会議を設定する'} onClick={createNewEvent} color="primary" />
            </MettingButtonContainer>
            <MailContainer>
                <NestedMailList
                    notResMailsInfo={displayAndEventInfo.infos.notResInfo}
                    resedMailsInfo={displayAndEventInfo.infos.resedInfo}
                    requestMailsInfo={displayAndEventInfo.infos.requestEventInfo}
                    onClickToNotRes={onClickToNotResed}
                    onClickToResed={onClickToResed}
                    onClickToRequest={onClickToRequest}
                />
            </MailContainer>
            <EventInfoContainer>
                {displayAndEventInfo.displayComponentsType === 'response' ? (
                    displayAndEventInfo.displayEventInfo !== undefined ? (
                        <EventInfo info={displayAndEventInfo.displayEventInfo!} participants={paticipants}></EventInfo>
                    ) : null
                ) : displayAndEventInfo.displayComponentsType === 'editRequest' ? (
                    <EventEdit info={displayAndEventInfo.displayEventInfo!} participants={paticipants} />
                ) : (
                    <EventEdit />
                )}
            </EventInfoContainer>
            <NextEventContainer>
                <NestedScheduleList
                    todayScheduleInfo={displayAndEventInfo.infos.todayEventInfo}
                    allScheduleInfo={displayAndEventInfo.infos.attendEventInfo}
                    onClickToDetail={onClickToSchedule}
                />
            </NextEventContainer>
            {displayAndEventInfo.displayComponentsType === 'response' ? (
                <ResponseContainer>
                    <ResponseComponent eventId={displayAndEventInfo.displayEventId!}></ResponseComponent>
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
