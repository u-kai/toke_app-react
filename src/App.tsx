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
function App() {
    const [userId, setUserId] = useRecoilState(userIdState)
    const [notResEventInfo, setNotResEventInfo] = useState<ScheduleInfoResults>([])
    const [resedEventInfo, setResedEventInfo] = useState<ScheduleInfoResults>([])
    const [attendEventInfo, setAttendEventInfo] = useState<ScheduleInfoResults>([])
    const [todayEventInfo,setTodayEventInfo] = useState<ScheduleInfoResults>([])
    useEffect(() => {
        const dateChecker = new DateChecker()
        const notResEventStateMaker = new StateMakerForGetSchedulesInfo('getNotRes', userId)
        notResEventStateMaker.returnErrorAndInfos().then((data) => {
            if (data.infos) {
                console.log(data.infos)
                const sortList = dateChecker.sortInfo(data.infos)
                setNotResEventInfo(sortList)
            }
        })
        const resedEventStateMaker = new StateMakerForGetSchedulesInfo('getResed', userId)
        resedEventStateMaker.returnErrorAndInfos().then((data) => {
            if (data.infos) {
                const sortList = dateChecker.sortInfo(data.infos)
                setNotResEventInfo(sortList)
                setResedEventInfo(data.infos)
            }
        })
        const attendEventStateMaker = new StateMakerForGetSchedulesInfo('getEvent', userId)
        attendEventStateMaker.returnErrorAndInfos().then((data) => {
            if (data.infos) {
                const sortList = dateChecker.sortInfo(data.infos)
                setNotResEventInfo(sortList)
                setAttendEventInfo(data.infos)
                const todays = data.infos.filter((data)=>dateChecker.isToday(data.start_date))
                setTodayEventInfo(todays)
            }
        })
        
    }, [userId])
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
                            console.log(e.currentTarget.id)
                        }}
                    />
                </MailContainer>
                <EventInfoContainer>
                    <div>出席依頼</div>
                    <div>開催者：有働開</div>
                    <div>目的：夏休みの祭りに慣るする会議</div>
                    <div>日時：2021/06/08(金)11:00</div>
                    <div>場所：家</div>
                    <div>持ち物：筆記用具</div>
                    <div>概要</div>
                    <div>夏休みに開催する祭りを行うかどうかの会議をしたいと思います．よろしくお願いいたします．</div>
                    <div>現在の参加者</div>
                    <ul>
                        <li>udokai</li>
                        <li>udomaki</li>
                    </ul>
                </EventInfoContainer>
                <NextEventContainer>
                    <NestedScheduleList
                        todayScheduleInfo={todayEventInfo}
                        allScheduleInfo={attendEventInfo}
                        onClickToDetail={(e) => {
                            console.log(e.currentTarget.id)
                        }}
                    />
                </NextEventContainer>
                <ResponseContainer>
                    <button>欠席</button>
                    <button>出席</button>
                    <textarea></textarea>
                    <button>送信</button>
                </ResponseContainer>
            </Container>
        </RecoilRoot>
    )
}
const Container = styled.div`
    width: 100%;
    height: 750px;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 9% 10% 55% 25%;
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
export default App
