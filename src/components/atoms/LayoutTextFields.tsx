import React, { VFC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '70%',
            marginTop: 30,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    })
)

type Props = {
    id: string
    value: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    placeholder?: string
    label: string
}

export const LayoutTextFields: VFC<Props> = (props) => {
    const classes = useStyles()
    const { id, value, onChange, placeholder = '', label } = props

    return (
        <div className={classes.root}>
            <TextField
                id={id}
                label={label}
                style={{ margin: 8 }}
                placeholder={placeholder}
                fullWidth
                margin="normal"
                onChange={onChange}
                value={value}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    )
}
