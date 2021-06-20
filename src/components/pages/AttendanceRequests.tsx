import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import React, { useState, VFC } from 'react'
import { useRecoilValue } from 'recoil'
import { attendanceRequestIdState } from 'store/attendance_request_id'
import { userIdState } from 'store/user_id'
import styled from 'styled-components'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ResponseAttendanceRequestProps as Props } from 'types/ui-types/ResponseAttendanceRequestProps'

export const AttendanceRequests: VFC<Props> = (props) => {
    const { attendanceRequestId, purpose, date, brings, describe } = props
    const items = ['目的', '日時', '持ち物', '概要']
    const requestDates = [purpose, date, brings, describe]

    const userId = useRecoilValue(userIdState)
    const [isAttend, setIsAttend] = useState(false)
    const [prefixDesc, setPrefixDesc] = useState<'欠席します．' | '出席します．'>('欠席します．')
    const [message, setMessage] = useState('')
    const absent = () => {
        setIsAttend(false)
        setPrefixDesc('欠席します．')
    }
    const attend = () => {
        setIsAttend(true)
        setPrefixDesc('出席します．')
    }
    const changeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }
    const sendData = () => {
        const sendInfo = {
            userId: userId,
            attendanceRequestId: attendanceRequestId,
            isAttend: isAttend.toString(),
            message: message,
        }
        console.log('sendInfo', sendInfo)
        postAndReturnResponseToJson(sendInfo, 'changeResponse').then((results: BackendReturn) => {
            console.log('updatefasdfasdf', results)
        })
    }
    return (
        <Container>
            <Title>出席依頼</Title>
            <ul>
                {items.map((item, i) => (
                    <div key={`itemConteinar${item}`} style={{ display: 'flex', flexDirection: 'row' }}>
                        <li key={`li${item}`}>
                            <span key={`${item}`}>{item}:</span>
                        </li>
                        <span key={`datas${requestDates[i]}`}>{requestDates[i]}</span>
                    </div>
                ))}
            </ul>
            <ResponseContainer>
                <button onClick={attend}>出席</button>・<button onClick={absent}>欠席</button>
                <p>返信</p>
                <div>
                    <p>{prefixDesc}</p>
                    <textarea placeholder={'何かあればお書きください'} onChange={changeMessage}>
                        {message}
                    </textarea>
                </div>
                <div></div>
                <SendButton onClick={sendData}>送信する</SendButton>
            </ResponseContainer>
        </Container>
    )
}
const Container = styled.div`
    height: 700px;
    width: 80%;
`
const Title = styled.h1`
    border-bottom: solid 3px black;
    text-align: center;
`
const ResponseContainer = styled.div``

const SendButton = styled.button`
    background-color: #00ffcc;
    color: white;
    width: 200px;
    height: 80px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    border: solid 2px transparent;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        border: solid 2px #00ffcc;
        color: #00ffcc;
        background-color: transparent;
    }
`
