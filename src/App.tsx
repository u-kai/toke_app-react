import { GroupCard } from 'components/molecules/GroupCard'
import { MultipleSelectAndAddButton } from 'components/molecules/MultipleSelectAndAddButton'
import { AttendanceRequests } from 'components/pages/AttendanceRequests'
import { Login } from 'components/pages/Login'
import { MakeAttendanceRequest } from 'components/pages/MakeAttendanceRequest'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'router/Router'
function App() {
    return (
        // <GroupCard></GroupCard>
        // <AttendanceRequests></AttendanceRequests>
        <>
            <RecoilRoot>
                <BrowserRouter>
                    <Router></Router>
                </BrowserRouter>
            </RecoilRoot>
            {/* <MakeAttendanceRequest></MakeAttendanceRequest>
            <MultipleSelectAndAddButton></MultipleSelectAndAddButton> */}
        </>
    )
}

export default App
