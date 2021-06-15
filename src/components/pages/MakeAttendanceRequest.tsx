import React, { useState } from 'react'
import styled from 'styled-components'
import { LayoutTextField } from 'components/atoms/LayoutTextField'
import { DateAndTimePickers } from 'components/atoms/DateAndTimePickers'
import { SendButton } from 'components/atoms/SendButton'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { TimePicker } from 'components/atoms/TimePicker'
import { useRecoilValue } from 'recoil'
import { userIdState } from 'store/user_id'
import { userNameState } from 'store/user_name'
import { dateCalculater } from 'functions/dateCalculater'
import { DateOperater } from 'model/DateOperater'
const dateOperater = new DateOperater()
const today = dateOperater.forMaterialUI()
export const MakeAttendanceRequest = () => {
    const organizeId = useRecoilValue(userIdState)
    const organizerName = useRecoilValue(userNameState)
    const idList = ['purpose', 'date', 'brings', 'desc']
    const [purpose, setPurpose] = useState('')
    const [date, setDate] = useState(today)
    const [requestTime, setRequestTime] = useState('00:30')
    const [burings, setBurings] = useState('')
    const [desc, setDesc] = useState('')
    const changePurpose = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPurpose(e.target.value)
    }
    const changeBurings = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBurings(e.target.value)
    }
    const changeDesc = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDesc(e.target.value)
    }
    const changeDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value)
        setDate(e.target.value)
    }
    const changeRequestTime = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(dateCalculater(date, e.target.value))
        setRequestTime(e.target.value)
    }
    const test = () => {
        const sendData = {
            purpose: purpose,
            burings: burings,
            desc: desc,
            organize_id: organizeId,
            organizer_name: organizerName,
            start_date: date,
            end_date: dateCalculater(date, requestTime),
        }
        console.log(sendData)
    }
    return (
        <Container>
            <Title>出席依頼</Title>

            <div>
                <LayoutTextField
                    key={'purose'}
                    id="purpose"
                    label="目的"
                    value={purpose}
                    placeholder={'会議のご案内'}
                    onChange={changePurpose}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <DateAndTimePickers date={date} id="date" label="日時" onChange={changeDate}></DateAndTimePickers>
                <TimePicker label="時間" onChange={changeRequestTime}></TimePicker>
            </div>
            <div>
                <LayoutTextField
                    key={'burings'}
                    id="burings"
                    label="持ち物"
                    value={burings}
                    placeholder={'筆記用具'}
                    onChange={changeBurings}
                />
            </div>
            <div>
                <MultilineTextFields value={desc} onChange={changeDesc}></MultilineTextFields>
            </div>
            <SendButton onClick={() => test()}></SendButton>
        </Container>
    )
}

const Container = styled.div``
const Title = styled.h1`
    border-bottom: solid 3px black;
    text-align: center;
`
