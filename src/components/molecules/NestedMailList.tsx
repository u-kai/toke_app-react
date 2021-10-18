import React, { useCallback, VFC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { SimpleBadge } from 'components/atoms/SimpleBadge'
import { DateConverter } from 'model/DateConverter'
import { DisplayEventInfoFragment, MailListInfoFragment } from 'types/generated/graphql'

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
    onClickToNotRes: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onClickToResed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onClickToRequest?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    notResMailsInfo: MailListInfoFragment[]
    resedMailsInfo: MailListInfoFragment[]
    requestMailsInfo: MailListInfoFragment[]
}

const dateConverter = new DateConverter()
export const NestedMailList: VFC<Props> = React.memo((props) => {
    const classes = useStyles()
    const [notResOpen, setNotResOpen] = React.useState(true)
    const [resedOpen, setResedOpen] = React.useState(false)
    const [requestOpen, setRequestOpen] = React.useState(false)
    const { notResMailsInfo, resedMailsInfo, requestMailsInfo, onClickToNotRes, onClickToResed, onClickToRequest } =
        props

    const handleClickForNotRes = () => {
        setNotResOpen(!notResOpen)
    }
    const handleClickForResed = () => {
        setResedOpen(!resedOpen)
    }
    const handleClickForRequest = () => {
        setRequestOpen(!requestOpen)
    }
    const display = (data: MailListInfoFragment): string => {
        const { startDate, endDate, purpose } = data.eventInfo
        return `${dateConverter.displayDateRange(startDate, endDate)} ${purpose}`
    }

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Mailリスト
                </ListSubheader>
            }
            className={classes.root}
        >
            <ListItem button onClick={handleClickForNotRes}>
                <ListItemIcon>
                    <SimpleBadge color="secondary" badgeContent={notResMailsInfo.length}></SimpleBadge>
                </ListItemIcon>
                <ListItemText primary="未返信" />
                {notResOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={notResOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {notResMailsInfo.map((notResInfo, i) => (
                        <ListItem
                            key={`notResInfoItem${i}`}
                            button
                            className={classes.nested}
                            id={notResInfo.eventId}
                            onClick={onClickToNotRes}
                        >
                            <ListItemText key={`notResInfoItemText${i}`} primary={display(notResInfo)} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <ListItem button onClick={handleClickForResed}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="返信済み" />
                {resedOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={resedOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {resedMailsInfo.map((resedInfo, i) => (
                        <ListItem
                            key={`resedInfoItem${i}`}
                            button
                            className={classes.nested}
                            id={resedInfo.eventId}
                            onClick={onClickToResed}
                        >
                            <ListItemText key={`resedInfoItemText${i}`} primary={display(resedInfo)} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <ListItem button onClick={handleClickForRequest}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="送信済み" />
                {requestOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={requestOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {requestMailsInfo.map((sendInfo, i) => (
                        <ListItem
                            key={`sendInfoItem${i}`}
                            button
                            className={classes.nested}
                            id={sendInfo.eventId}
                            onClick={onClickToRequest}
                        >
                            <ListItemText key={`sendInfoItemText${i}`} primary={display(sendInfo)} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </List>
    )
})
