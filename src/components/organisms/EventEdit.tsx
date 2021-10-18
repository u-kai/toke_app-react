import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { DateConverter } from 'model/DateConverter'
import { OutlineChip } from 'components/atoms/OutLineChip'
import { MultipleSelect } from 'components/atoms/MultipleSelect'
import React, { useContext, useState } from 'react'
import { DateAndTimePickers } from 'components/atoms/DateAndTimePickers'
import { SendButton } from 'components/atoms/SendButton'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { TimePicker } from 'components/atoms/TimePicker'
import TextField from '@material-ui/core/TextField'
import { UserIdContext } from 'providers/UserIdProvider'
import { BannerMessageContext } from 'providers/BannerMessage'
import { DisplayEventContext } from 'reducers/DisplayEvent'
import { AllUserContext } from 'providers/AllUser'
import { dateCalculater } from 'functions/dateCalculater'
import {
    CreateEventInput,
    EditEventInput,
    FetchHomeDataDocument,
    useCreateNewEventMutation,
    useEditEventMutation,
} from 'types/generated/graphql'
import { EventEditMode } from 'types/ui-types/EventEditMode'

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
const dateConverter = new DateConverter()

type Props = {
    eventEdit: EventEditMode
}
export const EventEdit: React.VFC<Props> = (props) => {
    const classes = useStyles()
    const { eventEdit } = props
    const { userName } = useContext(UserIdContext).userInfo
    const { bannerDispatch } = useContext(BannerMessageContext)
    const { allUser } = useContext(AllUserContext)
    const { displayEvent, displayEventDispatch } = useContext(DisplayEventContext)
    const [eventTime, setEventTime] = useState('00:30')
    const [postNewEvent] = useCreateNewEventMutation({
        awaitRefetchQueries: true,
        refetchQueries: [FetchHomeDataDocument],
    })
    const [postEditEvent] = useEditEventMutation({
        awaitRefetchQueries: true,
        refetchQueries: [FetchHomeDataDocument],
    })

    const changePurpose = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        displayEventDispatch({ type: 'inputPurpose', value })
    }

    const changeBring = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        displayEventDispatch({ type: 'inputBring', value })
    }
    const changeDesc = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        displayEventDispatch({ type: 'inputDescribes', value })
    }

    const changeStartDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const startDate: string = dateConverter.forDB(e.target.value)
        displayEventDispatch({ type: 'inputStartDate', value: startDate })
    }
    const changeEventTime = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const value = e.target.value
        setEventTime(value)
    }
    const changeLocation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        displayEventDispatch({ type: 'inputLocation', value })
    }
    const onClickSendButton = async () => {
        const { describes, bring, location, purpose, organizerId, organizerName, startDate } = displayEvent.eventInfo
        const { eventId, paticipantUsers } = displayEvent

        const endDate: string = dateCalculater(startDate, eventTime)

        const created = dateConverter.forDB()
        const info = {
            describes,
            bring,
            location,
            purpose,
            organizerId,
            organizerName,
            startDate: dateConverter.forDB(startDate),
            endDate,
            created,
        }
        const userInfos = paticipantUsers
        if (eventEdit === 'newEvent') {
            const createEventInput: CreateEventInput = {
                info,
                userInfos,
            }
            await postNewEvent({
                variables: {
                    input: createEventInput,
                },
            }).catch((e) => bannerDispatch({ type: 'setError', message: e.toString() }))
            return
        }

        if (eventEdit === 'editEvent') {
            const editEventInput: EditEventInput = {
                eventId,
                info,
                userInfos,
            }
            await postEditEvent({
                variables: {
                    input: editEventInput,
                },
            }).catch((e) => bannerDispatch({ type: 'setError', message: e.toString() }))
        }
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    出席依頼
                </Typography>
                <br />
                <Typography className={classes.pos}>
                    <TextField id="organizer_name" label="開催者" value={userName} />
                </Typography>
                <Typography className={classes.pos}>
                    <TextField
                        id="porpose"
                        label="目的"
                        value={displayEvent.eventInfo.purpose}
                        onChange={changePurpose}
                    />
                </Typography>
                <Typography className={classes.pos}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <DateAndTimePickers
                            date={dateConverter.forMaterialUI(displayEvent.eventInfo.startDate)}
                            id="date"
                            label="日時"
                            onChange={changeStartDate}
                        />
                        <TimePicker label="時間" onChange={changeEventTime} />
                    </div>
                </Typography>
                <Typography className={classes.pos}>
                    <TextField
                        id="location"
                        label="場所"
                        value={displayEvent.eventInfo.location}
                        onChange={changeLocation}
                    />
                </Typography>
                <Typography className={classes.pos}>
                    <TextField id="bring" label="持ち物" value={displayEvent.eventInfo.bring} onChange={changeBring} />
                </Typography>
                <Typography className={classes.pos}>
                    <MultilineTextFields
                        placeholder={'説明'}
                        value={displayEvent.eventInfo.describes}
                        onChange={changeDesc}
                    />
                </Typography>
                <Typography className={classes.pos}>現在の参加者</Typography>
                <Container>
                    {displayEvent.currentPaticipants.map((paticipant, i) => (
                        <OutlineChip key={paticipant + i.toString()} label={paticipant.userName} color={'primary'} />
                    ))}
                </Container>
                <DisplayFlexContainer>
                    <MultipleSelect
                        allUserInfo={allUser}
                        placeholder={'メンバーを選択'}
                        selectNames={displayEvent.paticipantUsers.map((u) => u.userName)}
                    />
                    <SendButton onClick={onClickSendButton} />
                </DisplayFlexContainer>
            </CardContent>
        </Card>
    )
}
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`
const DisplayFlexContainer = styled.div`
    display: flex;
`
