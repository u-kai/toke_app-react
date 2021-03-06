import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateConverter } from 'model/DateConverter'
import { OutlineChip } from 'components/atoms/OutLineChip'
import React, { useContext } from 'react'
import { DisplayEventInfoFragment, DisplayUserEventFragment } from 'types/generated/graphql'
import { DisplayEventContext } from 'reducers/DisplayEvent'
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
    event: DisplayUserEventFragment
}
const dateConverter = new DateConverter()
export const EventInfo: React.VFC<Props> = React.memo((props) => {
    const classes = useStyles()
    // const { displayEvent } = useContext(DisplayEventContext)
    // const { eventId, eventInfo, paticipantUsers } = props.event
    // const { organizerName, purpose, bring, location, startDate, endDate, describes } = eventInfo
    //const { paticipantUsers } = displayEvent

    const { event } = props.event
    const { organizerName, purpose, bring, location, startDate, endDate, describes } = event.eventInfo
    const { paticipantUsers } = event
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    出席依頼
                </Typography>
                <br />
                <Typography className={classes.pos}>開催者: {organizerName}</Typography>
                <Typography className={classes.pos}>目的: {purpose}</Typography>
                <Typography className={classes.pos}>
                    日時: {dateConverter.displayDateRange(startDate, endDate)}
                </Typography>
                <Typography className={classes.pos}>場所: {location}</Typography>
                <Typography className={classes.pos}>持ち物: {bring}</Typography>
                <Typography className={classes.pos}>概要: {describes}</Typography>
                <Typography className={classes.pos}>現在の参加者</Typography>
                <Container>
                    {paticipantUsers.map((paticipant) => (
                        <OutlineChip label={paticipant.userName} color={'primary'} />
                    ))}
                </Container>
            </CardContent>
        </Card>
    )
})
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`
