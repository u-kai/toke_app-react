import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateConverter } from 'model/DateConverter'
import { OutlineChip } from 'components/atoms/OutLineChip'
import { dateCalculater } from 'functions/dateCalculater'
import { MultipleSelect } from 'components/atoms/MultipleSelect'
import { StateMakerForNewEventRegist } from 'model/StateMaker/StateMakerForNewEventRegist'
import { StateMakerForGetMembers } from 'model/StateMaker/StateMakerForGetMembers'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { DateAndTimePickers } from 'components/atoms/DateAndTimePickers'
import { SendButton } from 'components/atoms/SendButton'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { TimePicker } from 'components/atoms/TimePicker'
import TextField from '@material-ui/core/TextField'
import { UserIdContext } from 'providers/UserIdProvider'
import { BannerMessageContext } from 'providers/BannerMessage'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 7,
    },
})
type Props = {
    eventId?: string
    info?: ScheduleInfo
    participants?: string[]
}
const dateConverter = new DateConverter()
const today = dateConverter.forMaterialUI()
export const EventEdit: React.VFC<Props> = React.memo((props) => {
    const classes = useStyles()
    const context = useContext(UserIdContext)
    const bannerContext = useContext(BannerMessageContext)
    const { bannerDispatch } = bannerContext

    const { userInfo } = context
    const {
        info = {
            purpose: '',
            location: '',
            describes: '',
            bring: '',
            organizer_id: userInfo.userId,
            organizer_name: userInfo.userName,
            date: new Date().toString(),
            start_date: today,
            end_date: '',
        },
        participants = [],
    } = props
    const [purpose, setPurpose] = useState(info.purpose)
    const [date, setDate] = useState(info.start_date)
    const [requestTime, setRequestTime] = useState('00:30')
    const [bring, setBring] = useState(info.bring)
    const [desc, setDesc] = useState(info.describes)
    const [location, setLocation] = useState(info.location)
    const [isSend, setIsSend] = useState(false)
    // const [error, setError] = useState('')

    const [memberIds, setMemberIds] = useState([''])
    const [memberNames, setMemberNames] = useState([''])
    const [selectedMembers, setSelectedMembers] = useState<string[]>(participants)
    useEffect(() => {
        const stateMaker = new StateMakerForGetMembers(userInfo.userId)
        stateMaker.returnErrorAndIdsNames().then((data) => {
            bannerDispatch({ type: 'setError', value: data.error })
            setMemberIds(data.data.ids)
            setMemberNames(data.data.names)
        })
    }, [])

    const changePurpose = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPurpose(e.target.value)
        },
        [setPurpose]
    )

    const changeBring = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setBring(e.target.value)
        },
        [setBring]
    )
    const changeDesc = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setDesc(e.target.value)
        },
        [setDesc]
    )
    const changeDate = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setDate(e.target.value)
        },
        [setDesc]
    )
    const changeRequestTime = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setRequestTime(e.target.value)
        },
        [setRequestTime]
    )
    const changeLocation = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setLocation(e.target.value)
        },
        [setLocation]
    )
    const test = () => {
        setIsSend(true)
        const stateMaker = new StateMakerForNewEventRegist(
            purpose,
            bring,
            desc,
            userInfo.userId,
            userInfo.userName,
            location,
            date,
            dateCalculater(date, requestTime),
            memberIds
        )
        stateMaker.returnErrorAndSuccessMessage().then((data) => {
            if (data.error === '') {
                bannerDispatch({ type: 'setSuccess', value: data.success })
                return
            }
            bannerDispatch({ type: 'setError', value: data.error })
        })
    }

    const changeMembers = useCallback(
        (event: React.ChangeEvent<{ value: unknown }>) => {
            setSelectedMembers(event.target.value as string[])
        },
        [setSelectedMembers]
    )
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    出席依頼
                </Typography>
                <br />
                <Typography className={classes.pos}>
                    <TextField id="organizer_name" label="開催者" value={info.organizer_name} />
                </Typography>
                <Typography className={classes.pos}>
                    <TextField id="porpose" label="目的" value={purpose} onChange={changePurpose} />
                </Typography>
                <Typography className={classes.pos}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <DateAndTimePickers
                            date={date}
                            id="date"
                            label="日時"
                            onChange={changeDate}
                        ></DateAndTimePickers>
                        <TimePicker label="時間" onChange={changeRequestTime}></TimePicker>
                    </div>
                </Typography>
                <Typography className={classes.pos}>
                    <TextField id="location" label="場所" value={location} onChange={changeLocation} />
                </Typography>
                <Typography className={classes.pos}>
                    <TextField id="bring" label="持ち物" value={bring} onChange={changeBring} />
                </Typography>
                <Typography className={classes.pos}>
                    <MultilineTextFields placeholder={'説明'} value={desc} onChange={changeDesc}></MultilineTextFields>
                </Typography>
                <Typography className={classes.pos}>現在の参加者</Typography>
                <Container>
                    {participants.map((participant) => (
                        <OutlineChip label={participant} color={'primary'}></OutlineChip>
                    ))}
                </Container>
                <DisplayFlexContainer>
                    <MultipleSelect
                        names={memberNames}
                        onChange={changeMembers}
                        placeholder={'メンバーを選択'}
                        selectNames={selectedMembers}
                    />
                    <SendButton onClick={test}></SendButton>
                </DisplayFlexContainer>
            </CardContent>
        </Card>
    )
})
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`
const DisplayFlexContainer = styled.div`
    display: flex;
`
