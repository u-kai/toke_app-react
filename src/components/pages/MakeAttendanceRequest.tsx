import React, { useState } from 'react'
import styled from 'styled-components'
import { LayoutTextFields } from 'components/atoms/LayoutTextFields'
export const MakeAttendanceRequest = () => {
    type AttendanceRequestInputs = {
        id: string
        label: string
        inputElement: JSX.Element
    }
    const idList = ['purpose', 'date', 'brings', 'desc']
    const [purpose, setPurpose] = useState('')
    const handleChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPurpose(e.target.value)
    }
    return (
        <Container>
            <Title>出席依頼</Title>

            <div>
                <LayoutTextFields
                    key={'purose'}
                    id="purpose"
                    label="目的"
                    value={purpose}
                    placeholder={'会議のご案内'}
                    onChange={handleChage}
                />
            </div>
            <label htmlFor={'date'}>日時：</label>
            <input id="date" type="text"></input>
            <label htmlFor={'brings'}>持ち物：</label>
            <input id="brings" type="text"></input>
            <label htmlFor={'desc'}>概要：</label>
            <input id="desc" type="text"></input>
        </Container>
    )
}

const Container = styled.div``
const Title = styled.h1`
    border-bottom: solid 3px black;
    text-align: center;
`
