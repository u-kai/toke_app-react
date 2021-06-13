import React from 'react'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    })
)


type Props = {
    onClick:()=>void
}
export const SendButton:React.VFC<Props> = (props) => {
    const classes = useStyles()
    const {onClick} = props
    return (
        <div>
            {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button} 
                endIcon={<Icon>send</Icon>}
                onClick={onClick}>
                Send
            </Button>
        </div>
    )
}
