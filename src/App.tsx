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
import socketIOClient from "socket.io-client"
function App() {
    // const socket = socketIOClient("http://localhost:8080")
    // socket.on("send test",(data:string)=>{
    //     console.log(data)
    // })
    return (
        // <GroupCard></GroupCard>
        // <AttendanceRequests></AttendanceRequests>
        <>
            <RecoilRoot>
                <BrowserRouter>
                    <Router></Router>
                </BrowserRouter>
                <SocketIo></SocketIo>
                <NewRegistUser></NewRegistUser>
                <MakeAttendanceRequest></MakeAttendanceRequest>
                <AttendanceRequests
                    purpose="test"
                    date="test"
                    describe="test"
                    attendanceRequestId="1"
                    brings="test"
                ></AttendanceRequests>
            </RecoilRoot>
            {/* <MakeAttendanceRequest></MakeAttendanceRequest>
            <MultipleSelectAndAddButton></MultipleSelectAndAddButton> */}
        </>
    )
}

export default App
