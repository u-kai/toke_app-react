import { GroupCard } from 'components/molecules/GroupCard'
import { MultipleSelectAndAddButton } from 'components/molecules/MultipleSelectAndAddButton'
import { AttendanceRequests } from 'components/pages/AttendanceRequests'
import { Login } from 'components/pages/Login'
import { MakeAttendanceRequest } from 'components/pages/MakeAttendanceRequest'
import React, { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'router/Router'
import { NewRegistUser } from 'components/pages/NewRegistUser'
import { SocketIo } from 'components/pages/SocketIo'
import socketIOClient from 'socket.io-client'
import { NestedMailList } from 'components/molecules/NestedMailList'
import { Link } from 'react-router-dom'
import { NestedScheduleList } from 'components/molecules/NestedScheduleList'
import styled from 'styled-components'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import PrimarySearchAppBar from 'components/atoms/PrimarySearchAppBar'
import { ReturnDataForScheduleInfo } from 'types/backend-return-tyeps/ReturnDataForScheduleInfo'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { userIdState } from 'store/user_id'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateChecker } from 'model/DateChecker'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { SendButton } from 'components/atoms/SendButton'
import { MUIButton } from 'components/atoms/MUIButton'
import { DateConverter } from 'model/DateConverter'
import { isReturnStatement } from 'typescript'
const dateConverter = new DateConverter()
export default function App() {
    const [userId, setUserId] = useRecoilState(userIdState)
    const [notResEventInfo, setNotResEventInfo] = useState<ScheduleInfoResults>([])
    const [resedEventInfo, setResedEventInfo] = useState<ScheduleInfoResults>([])
    const [attendEventInfo, setAttendEventInfo] = useState<ScheduleInfoResults>([])
    const [todayEventInfo, setTodayEventInfo] = useState<ScheduleInfoResults>([])
    const [responseMessage, setResponseMessage] = useState('')
    const [isAttend, setIsAttend] = useState(false)
    const [displayEventId, setDisplayEventId] = useState('')
    const postResponse = () => {
        console.log('not')
    }
    const handleAttned = (message: string, isAttend: boolean) => {
        setIsAttend(isAttend)
        setResponseMessage(message + responseMessage)
    }
    useEffect(() => {
        const dateChecker = new DateChecker()
        const infosList = [
            { url: 'getNotRes', info: notResEventInfo, huck: setNotResEventInfo },
            { url: 'getResed', info: resedEventInfo, huck: setResedEventInfo },
            { url: 'getEvent', info: attendEventInfo, huck: setAttendEventInfo },
        ]
        infosList.map((dataInfos) => {
            const stateMaker = new StateMakerForGetSchedulesInfo(dataInfos.url, userId)
            stateMaker.returnErrorAndInfos().then((data) => {
                console.log('!!!!!!!!!!', data.infos)
                if (data.infos) {
                    const sortList = dateChecker.sortTest(data.infos)
                    console.log(sortList)
                    dataInfos.huck(sortList)
                    if (dataInfos.url === 'getNotRes') {
                        console.log('getNotRes', sortList[0].attendance_request_id)
                        //setDisplayEventId(sortList[0].attendance_request_id)
                    }
                    if (dataInfos.url === 'getEvent') {
                        const todayInfos = data.infos?.filter((data) => dateChecker.isToday(data.start_date))
                        setTodayEventInfo(todayInfos)
                    }
                }
            })
        })
    }, [userId])
    // if(notResEventInfo[0] !== undefined){
    //     setDisplayEventId(notResEventInfo[0].attendance_request_id)
    // }
    const returnTest = (id: string) => {
        if (notResEventInfo.length !== 0) {
            console.log('id', typeof id)
            const clone = Object.assign([], notResEventInfo)
            const allEventInfo = clone.concat(resedEventInfo, attendEventInfo)
            console.log('allEventInfo', allEventInfo)
            console.log(
                'filter',
                allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
            )
            return allEventInfo.filter((info) => info.attendance_request_id.toString() === id.toString())[0]
        }
    }
    // console.log("returnTest",returnTest(displayEzventId))
    useEffect(() => {
        if (notResEventInfo[0] !== undefined) {
            setDisplayEventId(notResEventInfo[0].attendance_request_id)
        }
    }, [notResEventInfo])

    return (
        <RecoilRoot>
            <Container>
                <FooterContainer>
                    <input value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                    <PrimarySearchAppBar></PrimarySearchAppBar>
                </FooterContainer>
                <BanerContainer>
                    <SimpleAlert message={'success'} severity={'success'}></SimpleAlert>
                </BanerContainer>
                <MailContainer>
                    <NestedMailList
                        notResMailsInfo={notResEventInfo}
                        resedMailsInfo={resedEventInfo}
                        onClickToDetail={(e) => {
                            setDisplayEventId(e.currentTarget.id)
                        }}
                    />
                </MailContainer>
                {returnTest(displayEventId) !== undefined ? (
                    <EventInfoContainer>
                        <div>出席依頼</div>
                        <div>開催者：{returnTest(displayEventId)!.organizer_name}</div>
                        <div>目的：{returnTest(displayEventId)!.purpose}</div>
                        <div>
                            日時：
                            {dateConverter.displayDateRange(
                                returnTest(displayEventId)!.start_date,
                                returnTest(displayEventId)!.end_date
                            )}
                        </div>
                        <div>場所：{returnTest(displayEventId)!.location}</div>
                        <div>持ち物：{returnTest(displayEventId)!.bring}</div>
                        <div>概要</div>
                        <div>{returnTest(displayEventId)!.describes}</div>
                        <div>現在の参加者</div>
                        <ul>
                            <li></li>
                            <li>udomaki</li>
                        </ul>
                    </EventInfoContainer>
                ) : null}
                <NextEventContainer>
                    <NestedScheduleList
                        todayScheduleInfo={todayEventInfo}
                        allScheduleInfo={attendEventInfo}
                        onClickToDetail={(e) => {
                            setDisplayEventId(e.currentTarget.id)
                        }}
                    />
                </NextEventContainer>
                <ResponseContainer>
                    <ButtonContainer>
                        <MUIButton label={'出席'} onClick={() => handleAttned('出席します.', true)} color={'primary'} />
                        <MUIButton
                            label={'欠席'}
                            onClick={() => handleAttned('欠席します.', false)}
                            color={'secondary'}
                        />
                    </ButtonContainer>
                    <MultilineTextFields
                        placeholder={'メッセージ'}
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                    />
                    <SendButton onClick={postResponse} />
                </ResponseContainer>
            </Container>
        </RecoilRoot>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    display-direction: row;
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
    border: solid 1px gray;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
`
const BanerContainer = styled.div`
    height: 100%;
    grid-row: 2/3;
    grid-column: 2/3;
    border: solid 1px gray;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 3px;
`
const MailContainer = styled.div`
    overflow: auto;
    height: 100%;
    grid-row: 3/4;
    grid-column: 1/2;
    border: solid 1px gray;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
const EventInfoContainer = styled.div`
    height: 100%;
    grid-row: 3/4;
    grid-column: 2/3;
    border: solid 1px gray;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
const NextEventContainer = styled.div`
    height: 100%;
    grid-row: 3/4;
    grid-column: 3/4;
    border: solid 1px gray;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
const ResponseContainer = styled.div`
    height: 100%;
    grid-row: 4/5;
    grid-column: 2/3;
    border: solid 1px gray;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    margin: 10px;
`
