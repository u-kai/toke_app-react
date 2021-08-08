import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateConverter } from 'model/DateConverter'
import { OutlineChip } from 'components/atoms/OutLineChip'
import React from 'react'
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
    info: ScheduleInfo
    participants: string[]
}
const dateConverter = new DateConverter()
export const EventInfo: React.VFC<Props> = React.memo((props) => {
    const classes = useStyles()
    const { info, participants } = props
    console.log('dadta info ', info)
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    出席依頼
                </Typography>
                <br />
                <Typography className={classes.pos}>開催者: {info.organizer_name}</Typography>
                <Typography className={classes.pos}>目的: {info.purpose}</Typography>
                <Typography className={classes.pos}>
                    日時: {dateConverter.displayDateRange(info.start_date, info.end_date)}
                </Typography>
                <Typography className={classes.pos}>場所: {info.location}</Typography>
                <Typography className={classes.pos}>持ち物: {info.bring}</Typography>
                <Typography className={classes.pos}>概要: {info.describes}</Typography>
                <Typography className={classes.pos}>現在の参加者</Typography>
                <Container>
                    {participants.map((participant) => (
                        <OutlineChip label={participant} color={'primary'}></OutlineChip>
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
