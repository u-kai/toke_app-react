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
function App() {
    // const socket = socketIOClient("http://localhost:8080")
    // socket.on("send test",(data:string)=>{
    //     console.log(data)
    // })
    const testNotRes = [
        {
            id: '1',
            startDate: '2021/07/01 11:00',
            endDate: '13:00',
            purpose: 'Lanch',
        },
        {
            id: '2',
            startDate: '2021/07/11 15:00',
            endDate: '17:00',
            purpose: 'Diner',
            data: 'dfaf',
        },
    ]
    const testResed = [
        {
            id: '3',
            startDate: '2021/07/02 11:00',
            endDate: '13:00',
            purpose: 'Lanch',
        },
        {
            id: '4',
            startDate: '2021/07/11 19:00',
            endDate: '21:00',
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
