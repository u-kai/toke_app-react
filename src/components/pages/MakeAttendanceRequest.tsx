import React, { useState } from 'react'
import styled from 'styled-components'
import { LayoutTextField } from 'components/atoms/LayoutTextField'
import { DateAndTimePickers } from 'components/atoms/DateAndTimePickers'
import { SendButton } from 'components/atoms/SendButton'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { TimePicker } from 'components/atoms/TimePicker'
export const MakeAttendanceRequest = () => {
    type AttendanceRequestInputs = {
        id: string
        label: string
        inputElement: JSX.Element
    }
    const idList = ['purpose', 'date', 'brings', 'desc']
    const [purpose, setPurpose] = useState('')
    const [date, setDate] = useState('')
    const [burings, setBurings] = useState('')
    const [desc, setDesc] = useState('')
    const handleChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPurpose(e.target.value)
    }
    // const onChange = (e) =>{
    //     console.log
    // }
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
                    onChange={handleChage}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <DateAndTimePickers
                    id="date"
                    label="日時"
                    onChange={(e) => console.log(e.target.value)}
                ></DateAndTimePickers>
                <TimePicker label="時間" onChange={(e) => console.log(e.target.value)}></TimePicker>
            </div>
            <div>
                <LayoutTextField
                    key={'burings'}
                    id="burings"
                    label="持ち物"
                    value={burings}
                    placeholder={'筆記用具'}
                    onChange={handleChage}
                />
            </div>
            <div>
                <MultilineTextFields></MultilineTextFields>
            </div>
            <SendButton onClick={() => console.log('dd')}></SendButton>
        </Container>
    )
}

const Container = styled.div``
const Title = styled.h1`
    border-bottom: solid 3px black;
    text-align: center;
`
