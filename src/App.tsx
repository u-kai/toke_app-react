import { GroupCard } from 'components/molecules/GroupCard'
import { MultipleSelectAndAddButton } from 'components/molecules/MultipleSelectAndAddButton'
import { AttendanceRequests } from 'components/pages/AttendanceRequests'
import { Login } from 'components/pages/Login'
import { MakeAttendanceRequest } from 'components/pages/MakeAttendanceRequest'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'router/Router'
import { NewRegistUser } from 'components/pages/NewRegistUser'
import { SocketIo } from 'components/pages/SocketIo'
import socketIOClient from 'socket.io-client'
import { NestedList } from 'components/molecules/NestedList'
import { Link } from "react-router-dom";
function App() {
    // const socket = socketIOClient("http://localhost:8080")
    // socket.on("send test",(data:string)=>{
    //     console.log(data)
    // })
    const testNotRes = [
        {
            id: '1',
            start_date: '2021-06-20T01:00:00.000Z',
            end_date: '2021-06-20T01:00:00.000Z',
            purpose: 'kokoronidosokudekitasinryakusyaha',
        },
        {
            id: '2',
            start_date: '2021-06-20T01:00:00.000Z',
            end_date: '2021-06-20T01:00:00.000Z',
            purpose: 'Diner',
            data: 'dfaf',
        },
    ]
    const testResed = [
        {
            id: '4',
            start_date: '2021-06-20T01:00:00.000Z',
            end_date: '2021-06-20T10:00:00.000Z',
            purpose: 'Diner',
        },
    ]
    const tests = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(e.currentTarget.id)
    }
    return (
        // <GroupCard></GroupCard>
        // <AttendanceRequests></AttendanceRequests>
        <>
            <RecoilRoot>
                <BrowserRouter>
                    <Router></Router>
                </BrowserRouter>
                <NestedList
                    onClickToDetail={tests}
                    notResMailsInfo={testNotRes}
                    resedMailsInfo={testResed}
                ></NestedList>
                <MakeAttendanceRequest></MakeAttendanceRequest>
                {/* <SocketIo></SocketIo>
                <NewRegistUser></NewRegistUser>
                <MakeAttendanceRequest></MakeAttendanceRequest>
                <AttendanceRequests
                    purpose="test"
                    date="test"
                    describe="test"
                    attendanceRequestId="1"
                    brings="test"
                ></AttendanceRequests> */}
            </RecoilRoot>
            {/* <MakeAttendanceRequest></MakeAttendanceRequest>
            <MultipleSelectAndAddButton></MultipleSelectAndAddButton> */}
        </>
    )
}

export default App
