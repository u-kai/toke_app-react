import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    })
)

type Props = {
    label: string
    onClick: () => void
    color: 'inherit' | 'default' | 'primary' | 'secondary' | undefined
}
export const MUIButton: React.VFC<Props> = (props) => {
    const classes = useStyles()
    const { label, onClick, color } = props
    return (
        <div className={classes.root}>
            <Button variant="contained" onClick={onClick} color={color}>
                {label}
            </Button>
        </div>
    )
}
