import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    })
)

export const AddButton = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    )
}
