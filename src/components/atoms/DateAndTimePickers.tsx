import React, { VFC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { DateOperater } from 'model/DateOperater'
import { FiberPin } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    })
)
const date = new DateOperater()
const today = date.forMaterialUI()
type Props = {
    id: string
    label: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}
export const DateAndTimePickers: VFC<Props> = (props) => {
    const classes = useStyles()
    const { id, label, onChange } = props
    return (
        <form className={classes.container} noValidate>
            <TextField
                id={id}
                label={label}
                type="datetime-local"
                defaultValue={today}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={onChange}
            />
        </form>
    )
}
