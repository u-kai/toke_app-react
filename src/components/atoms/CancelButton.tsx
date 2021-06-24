import React from 'react'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    })
)

export const CancelButton = () => {
    const classes = useStyles()

    return (
        <div>
            <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />}>
                Delete
            </Button>
        </div>
    )
}
