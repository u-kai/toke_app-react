import React, { VFC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { DateConverter } from 'model/DateConverter'

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
const date = new DateConverter()
const today = date.forMaterialUI()
type Props = {
    id: string
    label: string
    date: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}
export const DateAndTimePickers: VFC<Props> = (props) => {
    const classes = useStyles()
    const { id, label, onChange, date } = props
    return (
        <form className={classes.container} noValidate>
            <TextField
                id={id}
                label={label}
                type="datetime-local"
                value={date}
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
