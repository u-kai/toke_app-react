import React, { VFC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '90%',
            },
        },
    })
)

type Props = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

export const MultilineTextFields: VFC<Props> = (props) => {
    const classes = useStyles()
    const { value, onChange, placeholder } = props

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    value={value}
                    id="outlined-multiline-static"
                    label={placeholder}
                    multiline
                    rows={2}
                    onChange={onChange}
                    variant="outlined"
                />
            </div>
        </form>
    )
}
