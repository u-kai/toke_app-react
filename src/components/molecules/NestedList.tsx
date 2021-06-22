import React, { VFC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import { SimpleBadge } from 'components/atoms/SimpleBadge'

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
    notResMailsInfo: { startDate: string; endDate: string; purpose: string; id: string }[]
    resedMailsInfo: { startDate: string; endDate: string; purpose: string; id: string }[]
}
export const NestedList: VFC<Props> = (props) => {
    const classes = useStyles()
    const [notResOpen, setNotResOpen] = React.useState(false)
    const [resedOpen, setResedOpen] = React.useState(false)
    const { notResMailsInfo, resedMailsInfo, onClickToDetail } = props

    const handleClickForNotRes = () => {
        setNotResOpen(!notResOpen)
    }
    const handleClickForResed = () => {
        setResedOpen(!resedOpen)
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
                            id={notResInfo.id}
                            onClick={onClickToDetail}
                        >
                            <ListItemText key={`notResInfoItemText${i}`} primary={notResInfo.purpose}></ListItemText>
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
                            id={resedInfo.id}
                            onClick={onClickToDetail}
                        >
                            <ListItemText key={`resedInfoItemText${i}`} primary={resedInfo.purpose}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </List>
    )
}
