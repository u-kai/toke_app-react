import { GroupCard } from 'components/molecules/GroupCard'
import { MultipleSelectAndAddButton } from 'components/molecules/MultipleSelectAndAddButton'
import { AttendanceRequests } from 'components/organisms/AttendanceRequests'
import { MakeAttendanceRequest } from 'components/organisms/MakeAttendanceRequest'
import React, { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { BrowserRouter, Route } from 'react-router-dom'
import { Router } from 'router/Router'
import { NewRegistUser } from 'components/pages/NewRegistUser'
import { SocketIo } from 'components/organisms/SocketIo'
import socketIOClient from 'socket.io-client'
import { NestedMailList } from 'components/molecules/NestedMailList'
import { Link } from 'react-router-dom'
import { NestedScheduleList } from 'components/molecules/NestedScheduleList'
import styled from 'styled-components'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { PrimarySearchAppBar } from 'components/atoms/PrimarySearchAppBar'
import { ReturnDataForScheduleInfo } from 'types/backend-return-tyeps/ReturnDataForScheduleInfo'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { userIdState } from 'store/user_id'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateChecker } from 'model/DateChecker'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { SendButton } from 'components/atoms/SendButton'
import { MUIButton } from 'components/atoms/MUIButton'
import { DateConverter } from 'model/DateConverter'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { StateMakerForNewAttendanceResponseRegist } from 'model/StateMaker/StateMakerForNewAttendanceResponseRegist'
import { displayPartsToString } from 'typescript'
import { EventInfo } from 'components/organisms/EventInfo'
import { ResponseComponent } from 'components/organisms/ReponseComponent'
import { StateMakerForGetResponse } from 'model/StateMaker/StateMakerForGetResponse'
import { messageState } from 'store/message'
import { isAttendState } from 'store/isAttend'
import { userNameState } from 'store/user_name'
import { DateAndTimePickers } from 'components/atoms/DateAndTimePickers'
import { StateMakerForLogin } from 'model/StateMaker/StateMakerForLogin'
import { StateMakerForUserName } from 'model/StateMaker/StateMakerForUserName'
import userEvent from '@testing-library/user-event'
import { StateMakerForGetRequestInfos } from 'model/StateMaker/StateMakerForGetRequestInfos'
import { EventEdit } from 'components/organisms/EventEdit'
import { Home } from 'components/pages/Home'
import { Login } from 'components/pages/Login'
const dateConverter = new DateConverter()
export default function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/newRegistUser" component={NewRegistUser} />
            </BrowserRouter>
        </RecoilRoot>
    )
}
