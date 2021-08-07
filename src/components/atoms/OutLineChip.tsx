import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
    })
)
type Props = {
    label: string
    color: 'default' | 'primary' | 'secondary' | undefined
}
export const OutlineChip: React.VFC<Props> = (props) => {
    const classes = useStyles()
    const { label, color } = props

    return (
        <div className={classes.root}>
            <Chip icon={<FaceIcon />} label={label} color={color} variant="outlined" />
        </div>
    )
}
