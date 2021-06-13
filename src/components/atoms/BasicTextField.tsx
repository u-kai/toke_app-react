import React, { VFC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    })
)
type Props = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

export const BasicTextField: VFC<Props> = (props) => {
    const classes = useStyles()
    const { value, onChange } = props
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Standard" value={value} onChange={onChange} />
        </form>
    )
}
