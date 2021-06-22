import React, { useEffect, useState } from 'react'
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
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { BackendResultsChecker } from 'model/BackendResultsChecker'
import { MultipleSelect } from 'components/atoms/MultipleSelect'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { StateMakerForNewEventRegist } from 'model/StateMaker/StateMakerForNewEventRegist'
import { StateMakerForGetMembers } from 'model/StateMaker/StateMakerForGetMembers'
import { StateMakerForNewGroupRegist } from 'model/StateMaker/StateMakerForNewGroupRegist'
const dateOperater = new DateOperater()
const today = dateOperater.forMaterialUI()
export const MakeAttendanceRequest = () => {
    const organizerId = useRecoilValue(userIdState)
    const organizerName = useRecoilValue(userNameState)
    const idList = ['purpose', 'date', 'brings', 'desc']
    const [purpose, setPurpose] = useState('')
    const [date, setDate] = useState("2021/06/09")
    const [requestTime, setRequestTime] = useState('00:30')
    const [bring, setBring] = useState('')
    const [desc, setDesc] = useState('')
    const [location, setLocation] = useState('')
    const [isSend, setIsSend] = useState(false)
    const [error, setError] = useState('')
    // const [groupIds,setGroupIds] = useState([""])
    // const [groupNames,setGroupNames] = useState([""])
    const [groupName, setGroupName] = useState('')
    const [memberIds, setMemberIds] = useState([''])
    const [memberNames, setMemberNames] = useState([''])
    const [selectedMembers, setSelectedMembers] = useState([''])
    useEffect(() => {
        const stateMaker = new StateMakerForGetMembers(organizerId)
        stateMaker.returnErrorAndIdsNames().then((data) => {
            setError(data.error)
            setMemberIds(data.data.ids)
            setMemberNames(data.data.names)
        })
    }, [])
    const changePurpose = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPurpose(e.target.value)
    }
    const changeBring = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBring(e.target.value)
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
    const changeLocation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocation(e.target.value)
    }
    console.log(memberIds)
    const test = () => {
        setIsSend(true)
        const stateMaker = new StateMakerForNewEventRegist(
            purpose,
            bring,
            desc,
            organizerId,
            organizerName,
            location,
            date,
            dateCalculater(date, requestTime),
            memberIds
        )
        stateMaker.returnErrorAndSuccessMessage().then((data) => {
            setError(data.error)
            console.log('success', data.success)
        })
    }
    const testGroup = () => {
        const stateMakerForNewGroup = new StateMakerForNewGroupRegist(memberIds, groupName)
        stateMakerForNewGroup.returnErrorAndSuccessMessage().then((data) => {
            console.log(data.error)
            console.log(data.success)
        })
    }
    return (
        <Container>
            {error.length > 0 ? <SimpleAlert message={error} severity={'error'}></SimpleAlert> : null}
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
            <div>
                <MultipleSelect
                    names={memberNames}
                    onChange={(e) => setSelectedMembers([e.target.value as string])}
                    placeholder={'メンバーを選択'}
                    selectNames={selectedMembers}
                />
            </div>
            <input value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <button onClick={testGroup}>send</button>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <DateAndTimePickers date={date} id="date" label="日時" onChange={changeDate}></DateAndTimePickers>
                <TimePicker label="時間" onChange={changeRequestTime}></TimePicker>
            </div>
            <div>
                <LayoutTextField
                    key={'bring'}
                    id="bring"
                    label="持ち物"
                    value={bring}
                    placeholder={'筆記用具'}
                    onChange={changeBring}
                />
            </div>
            <div>
                <LayoutTextField
                    key={'location'}
                    id="location"
                    label="場所"
                    value={location}
                    placeholder={'公民館'}
                    onChange={changeLocation}
                />
            </div>
            <div>
                <MultilineTextFields value={desc} onChange={changeDesc}></MultilineTextFields>
            </div>
            <SendButton onClick={() => test()} isDisabled={isSend}></SendButton>
        </Container>
    )
}

const Container = styled.div``
const Title = styled.h1`
    border-bottom: solid 3px black;
    text-align: center;
`
