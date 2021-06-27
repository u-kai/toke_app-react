import React, { useEffect, useState, useReducer,useContext } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { SocketIo } from 'components/organisms/SocketIo'
import socketIOClient from 'socket.io-client'
import { NestedMailList } from 'components/molecules/NestedMailList'
import { NestedScheduleList } from 'components/molecules/NestedScheduleList'
import styled from 'styled-components'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { PrimarySearchAppBar } from 'components/atoms/PrimarySearchAppBar'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { userIdState } from 'store/user_id'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateChecker } from 'model/DateChecker'
import { MUIButton } from 'components/atoms/MUIButton'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { EventInfo } from 'components/organisms/EventInfo'
import { ResponseComponent } from 'components/organisms/ReponseComponent'
import { StateMakerForGetResponse } from 'model/StateMaker/StateMakerForGetResponse'
import { messageState } from 'store/message'
import { userNameState } from 'store/user_name'
import { StateMakerForUserName } from 'model/StateMaker/StateMakerForUserName'
import { StateMakerForGetRequestInfos } from 'model/StateMaker/StateMakerForGetRequestInfos'
import { EventEdit } from 'components/organisms/EventEdit'
import { UserIdContext } from 'providers/UserIdProvider'



export const Home = () => {
    const context = useContext(UserIdContext)
    const {userInfo,dispatch} = context
    console.log(context)
    // const [userId, setUserId] = useRecoilState(userIdState)
    // const [userName, setUserName] = useRecoilState(userNameState)
    const [message, setMessage] = useRecoilState(messageState)
    const [notResEventInfo, setNotResEventInfo] = useState<ScheduleInfoResults>([])
    const [resedEventInfo, setResedEventInfo] = useState<ScheduleInfoResults>([])
    const [attendEventInfo, setAttendEventInfo] = useState<ScheduleInfoResults>([])
    const [todayEventInfo, setTodayEventInfo] = useState<ScheduleInfoResults>([])
    const [requestsInfo, setRequestsInfo] = useState<ScheduleInfoResults>([])
    const [isAttend, setIsAttend] = useState<boolean | undefined>()
    const [displayEventId, setDisplayEventId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [paticipants, setPaticipants] = useState(['0人'])
    const [displayComponents, setDisplayComponents] = useState<'editRequest' | 'response' | 'newRequest'>('response')
    console.log('userName', userInfo.userName)
    const onClickToNotResed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setDisplayEventId(e.currentTarget.id)
        setIsAttend(false)
        setMessage('')
        setDisplayComponents('response')
    }
    const onClickToRequest = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setDisplayEventId(e.currentTarget.id)
        setIsAttend(false)
        setMessage('')
        setDisplayComponents('editRequest')
    }
    console.log(message)
    const onClickToResed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const eventId = e.currentTarget.id
        setDisplayEventId(eventId)
        const stateMaker = new StateMakerForGetResponse(userInfo.userId, eventId)
        stateMaker.returnErrorAndResponseInfo().then((data) => {
            console.log('infi', data)
            if (data.error !== '') {
                setErrorMessage(data.error)
                return
            }
            setIsAttend(data.responseInfo.isAttend)
            setMessage(data.responseInfo.message)
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
            // { url:"getRequests",info:notResEventInfo,huck:setRequestsInfo}
        ]
        infosList.map((dataInfos) => {
            const stateMaker = new StateMakerForGetSchedulesInfo(dataInfos.url, userInfo.userId)
            stateMaker.returnErrorAndInfos().then((data) => {
                if (data.infos === undefined) {
                    dataInfos.huck([])
                }
                setErrorMessage(data.error)
                if (data.infos) {
                    const sortList = dateChecker.sortTest(data.infos)
                    console.log(sortList)
                    dataInfos.huck(sortList)
                    if (dataInfos.url === 'getNotRes') {
                        console.log('getNotRes', sortList[0].attendance_request_id)
                        setDisplayEventId(sortList[0].attendance_request_id)
                    }
                    if (dataInfos.url === 'getEvent') {
                        console.log('getEvent', data.infos)
                        const todayInfos = data.infos?.filter((data) => dateChecker.isToday(data.start_date))
                        setTodayEventInfo(todayInfos)
                    }
                }
            })
        })
        const stateMakerUserName = new StateMakerForUserName(userInfo.userId)
        stateMakerUserName.returnErrorAndUserName().then((data) => {
            console.log('usreName!!!!!!!!!!!', data)
            if (data.userName !== '') {
                dispatch({type:"inputName",value:(data.userName)})
            }
            if (data.error !== '') {
                setErrorMessage(data.error)
            }
        })
        const stateMakerforRequestInfo = new StateMakerForGetRequestInfos(userInfo.userId)
        stateMakerforRequestInfo.returnErrorAndInfos().then((data) => {
            console.log('request', data)
            if (data.infos !== undefined) {
                setRequestsInfo(data.infos)
            }
            if (data.error !== '') {
                setErrorMessage(data.error)
            }
        })
    }, [userInfo.userId])
    const returnTest = (id: string) => {
        if (notResEventInfo.length !== 0 || resedEventInfo.length !== 0 || requestsInfo.length !== 0) {
            const clone = Object.assign([], notResEventInfo)
            const allEventInfo = clone.concat(resedEventInfo, attendEventInfo, requestsInfo)
            console.log(
                'restusn',
                allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
            )
            return allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
        }
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
                console.log('participant', data)
            }
        )
    }, [displayEventId])
    const changeUserId = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({type:"inputId",value:e.target.value})
    }
    return (
        // <RecoilRoot>
        <Container>
            <FooterContainer>
                <PrimarySearchAppBar value={userInfo.userId} onChange={changeUserId}></PrimarySearchAppBar>
            </FooterContainer>
            {errorMessage !== '' ? (
                <BanerContainer>
                    <SimpleAlert message={errorMessage} severity={'error'}></SimpleAlert>
                </BanerContainer>
            ) : null}
            {successMessage !== '' ? (
                <BanerContainer>
                    <SimpleAlert message={successMessage} severity={'success'}></SimpleAlert>
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
                    onClickToDetail={(e) => {
                        setDisplayEventId(e.currentTarget.id)
                    }}
                />
            </NextEventContainer>
            {displayComponents === 'response' ? (
                <ResponseContainer>
                    <ResponseComponent eventId={displayEventId}></ResponseComponent>
                </ResponseContainer>
            ) : null}
        </Container>
        // </RecoilRoot>
    )
}
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`
const ButtonContainer = styled.div`
    display: flex;
    display-direction: row;
`
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
