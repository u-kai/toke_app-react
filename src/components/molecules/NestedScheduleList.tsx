import React, { useCallback, VFC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { SimpleBadge } from 'components/atoms/SimpleBadge'
import { DateConverter } from 'model/DateConverter'
import { MailDisplayInfo } from 'types/ui-types/MailDisplayInfo'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    })
)

type Props = {
    onClickToDetail: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    todayScheduleInfo: MailDisplayInfo[]
    allScheduleInfo: MailDisplayInfo[]
}

const dateConverter = new DateConverter()
export const NestedScheduleList: VFC<Props> = React.memo((props) => {
    const classes = useStyles()
    const [notResOpen, setNotResOpen] = React.useState(true)
    const [resedOpen, setResedOpen] = React.useState(false)
    const { todayScheduleInfo, allScheduleInfo, onClickToDetail } = props
    const handleClickForNotRes = useCallback(() => {
        setNotResOpen(!notResOpen)
    },[setNotResOpen])

    const handleClickForResed = useCallback(() => {
        setResedOpen(!resedOpen)
    },[setResedOpen])
    
    const display = (data: MailDisplayInfo): string => {
        return `${dateConverter.displayDateRange(data.start_date, data.end_date)} ${data.purpose}`
    }
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    予定リスト
                </ListSubheader>
            }
            className={classes.root}
        >
            <ListItem button onClick={handleClickForNotRes}>
                <ListItemIcon>
                    <SimpleBadge color="secondary" badgeContent={todayScheduleInfo.length}></SimpleBadge>
                </ListItemIcon>
                <ListItemText primary="今日の予定" />
                {notResOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={notResOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {todayScheduleInfo.map((todayInfo, i) => (
                        <ListItem
                            key={`todayScheduleItem${i}`}
                            button
                            className={classes.nested}
                            id={todayInfo.attendance_request_id}
                            onClick={onClickToDetail}
                        >
                            <ListItemText key={`todayScheduleItemText${i}`} primary={display(todayInfo)}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <ListItem button onClick={handleClickForResed}>
                <ListItemIcon>
                    <SimpleBadge color="secondary" badgeContent={allScheduleInfo.length}></SimpleBadge>
                </ListItemIcon>
                <ListItemText primary="予定一覧" />
                {resedOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={resedOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {allScheduleInfo.map((scheduleInfo, i) => (
                        <ListItem
                            key={`scheduleInfoItem${i}`}
                            button
                            className={classes.nested}
                            id={scheduleInfo.attendance_request_id}
                            onClick={onClickToDetail}
                        >
                            <ListItemText
                                key={`scheduleInfoItemText${i}`}
                                primary={display(scheduleInfo)}
                            ></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </List>
    )
})
