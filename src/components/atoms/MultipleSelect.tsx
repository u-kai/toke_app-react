import React, { useContext, VFC } from 'react'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import { User, UserInfo } from 'types/generated/graphql'
import { UserEventsContext } from 'providers/UserEvents'
import { DisplayEventContext } from 'reducers/DisplayEvent'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 170,
            maxWidth: 200,
            maxHeight: 70,
            overflow: 'auto',
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    })
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    }
}

type Props = {
    selectNames: string[]
    placeholder: string
    allUserInfo: UserInfo[]
}

export const MultipleSelect: VFC<Props> = (props) => {
    const { allUserInfo, placeholder, selectNames } = props
    const { displayEvent, displayEventDispatch } = useContext(DisplayEventContext)
    const classes = useStyles()
    const theme = useTheme()
    const onClickUser = (e: React.MouseEvent<HTMLLIElement>): void => {
        const userId = e.currentTarget.id.substr(6)
        const userName = allUserInfo.filter((u) => u.userId === userId).map((u) => u.userName)[0]
        if (userName === undefined || userName === null) {
            return
        }
        const newPaticipantUser: UserInfo = {
            userId,
            userName,
        }
        if (displayEvent.paticipantUsers.filter((u) => u.userId === newPaticipantUser.userId).length > 0) {
            displayEventDispatch({ type: 'removePaticipant', paticipant: newPaticipantUser })
            return
        }
        displayEventDispatch({ type: 'addPaticipant', paticipant: newPaticipantUser })
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">{placeholder}</InputLabel>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={selectNames}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {allUserInfo.map((userInfo, i) => (
                        <MenuItem
                            key={userInfo.userName + i.toString()}
                            id={'userId' + allUserInfo.map((u) => u.userId)[i]}
                            value={userInfo.userName}
                            onClick={onClickUser}
                            style={getStyles(userInfo.userName, selectNames, theme)}
                        >
                            {userInfo.userName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{placeholder}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectNames}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as string[]).map((value, i) => (
                                <Chip key={value + i} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {displayEvent.paticipantUsers.map((userInfo) => (
                        <MenuItem
                            key={userInfo.userId}
                            value={userInfo.userName}
                            style={getStyles(userInfo.userName, selectNames, theme)}
                        >
                            {userInfo.userName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
