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
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { EventInfo } from 'components/organisms/EventInfo'
import { ResponseComponent } from 'components/organisms/ReponseComponent'
import { StateMakerForGetResponse } from 'model/StateMaker/StateMakerForGetResponse'
import { StateMakerForUserName } from 'model/StateMaker/StateMakerForUserName'
import { StateMakerForGetRequestInfos } from 'model/StateMaker/StateMakerForGetRequestInfos'
import { EventEdit } from 'components/organisms/EventEdit'
import { UserIdContext } from 'providers/UserIdProvider'
import { BannerMessageContext} from 'providers/BannerMessage'
import { ResponseInfoContext } from 'providers/ResponseInfoProvider'
export const Home = () => {
    const userContext = useContext(UserIdContext)
    const bannerMessageContext = useContext(BannerMessageContext)
    const { userInfo, dispatch } = userContext
    const responseInfoContext = useContext(ResponseInfoContext)
    const { responseInfo, responseInfoDispatch } = responseInfoContext
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
        setDisplayEventId(e.currentTarget.id)
        responseInfoDispatch({ type: 'selectAbsent' })
        setDisplayComponents('response')
    }
    const onClickToRequest = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setDisplayEventId(e.currentTarget.id)
        setDisplayComponents('editRequest')
    }
    const onClickToResed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const eventId = e.currentTarget.id
        setDisplayEventId(eventId)
        const stateMaker = new StateMakerForGetResponse(userInfo.userId, eventId)
        stateMaker.returnErrorAndResponseInfo().then((data) => {
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
                return
            }
            responseInfoDispatch({
                type: 'setState',
                setState: {
                    isAttend: data.responseInfo.isAttend,
                    responseMessage: data.responseInfo.message,
                },
            })
        })
        setDisplayComponents('response')
    }
    const createNewEvent = () => {
        setDisplayComponents('newRequest')
        setRequestsInfo([])
    }
    useEffect(() => {
        const dateChecker = new DateChecker()
        const infosList = [
            { url: 'getNotRes', info: notResEventInfo, huck: setNotResEventInfo },
            { url: 'getResed', info: resedEventInfo, huck: setResedEventInfo },
            { url: 'getEvent', info: attendEventInfo, huck: setAttendEventInfo },
        ]
        infosList.map((dataInfos) => {
            const stateMaker = new StateMakerForGetSchedulesInfo(dataInfos.url, userInfo.userId)
            stateMaker.returnErrorAndInfos().then((data) => {
                if (data.infos === undefined) {
                    dataInfos.huck([])
                }
                bannerDispatch({ type: 'setError', value: data.error })
                if (data.infos) {
                    const sortList = dateChecker.sortTest(data.infos)
                    dataInfos.huck(sortList)
                    if (dataInfos.url === 'getNotRes') {
                        setDisplayEventId(sortList[0].attendance_request_id)
                    }
                    if (dataInfos.url === 'getEvent') {
                        const todayInfos = data.infos?.filter((data) => dateChecker.isToday(data.start_date))
                        setTodayEventInfo(todayInfos)
                    }
                }
            })
        })
        const stateMakerUserName = new StateMakerForUserName(userInfo.userId)
        stateMakerUserName.returnErrorAndUserName().then((data) => {
            if (data.userName !== '') {
                dispatch({ type: 'inputName', value: data.userName })
            }
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
            }
        })
        const stateMakerforRequestInfo = new StateMakerForGetRequestInfos(userInfo.userId)
        stateMakerforRequestInfo.returnErrorAndInfos().then((data) => {
            if (data.infos !== undefined) {
                setRequestsInfo(data.infos)
            }
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
            }
        })
    }, [userInfo.userId])
    const returnTest = (id: string) => {
        if (notResEventInfo.length !== 0 || resedEventInfo.length !== 0 || requestsInfo.length !== 0) {
            const clone = Object.assign([], notResEventInfo)
            const allEventInfo = clone.concat(resedEventInfo, attendEventInfo, requestsInfo)
            return allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
        }
    }
    const onClickToSchedule = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setDisplayEventId(e.currentTarget.id)
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
            }
        })
        setDisplayComponents('response')
    }
    useEffect(() => {
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
    }, [notResEventInfo, resedEventInfo, requestsInfo])
    useEffect(() => {
        postAndReturnResponseToJson({ attendanceRequestId: displayEventId }, 'getPaticipants').then(
            (data: BackendReturn) => {
                if (data.results.error?.sqlMessage === 'データが見つかりませんでした．') {
                    setPaticipants(['0人'])
                }
                if (data.results.select !== undefined) {
                    const userData = data.results.select as { user_name: string }[]
                    setPaticipants(userData.map((data) => data.user_name))
                }
            }
        )
    }, [displayEventId])
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
                    notResMailsInfo={notResEventInfo}
                    resedMailsInfo={resedEventInfo}
                    requestMailsInfo={requestsInfo}
                    onClickToNotRes={onClickToNotResed}
                    onClickToResed={onClickToResed}
                    onClickToRequest={onClickToRequest}
                />
            </MailContainer>
            <EventInfoContainer>
                {displayComponents === 'response' ? (
                    returnTest(displayEventId) !== undefined ? (
                        <EventInfo info={returnTest(displayEventId)!} participants={paticipants}></EventInfo>
                    ) : null
                ) : displayComponents === 'editRequest' ? (
                    <EventEdit info={returnTest(displayEventId)!} participants={paticipants} />
                ) : (
                    <EventEdit />
                )}
            </EventInfoContainer>
            <NextEventContainer>
                <NestedScheduleList
                    todayScheduleInfo={todayEventInfo}
                    allScheduleInfo={attendEventInfo}
                    onClickToDetail={onClickToSchedule}
                />
            </NextEventContainer>
            {displayComponents === 'response' ? (
                <ResponseContainer>
                    <ResponseComponent eventId={displayEventId}></ResponseComponent>
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
