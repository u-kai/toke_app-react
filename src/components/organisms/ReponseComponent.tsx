import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { DateConverter } from 'model/DateConverter'
import { OutlineChip } from 'components/atoms/OutLineChip'
import { useEffect, useState } from 'react'
import { StateMakerForNewAttendanceResponseRegist } from 'model/StateMaker/StateMakerForNewAttendanceResponseRegist'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { userIdState } from 'store/user_id'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { SendButton } from 'components/atoms/SendButton'
import { MUIButton } from 'components/atoms/MUIButton'
import { StateMaker } from 'model/StateMaker/StateMaker'
import { StateMakerForChangeResponse } from 'model/StateMaker/StateMakerForChangeResponse'
import {messageState} from "store/message"
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 7,
    },
})
type Props = {
    eventId: string
    propsMessage?: string
    propsSetMessage?:string
    propsIsAttend?: boolean
}

export const ResponseComponent: React.VFC<Props> = (props) => {
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>
    const { eventId } = props
    const [newOrChange,setNewOrChange] = useState<"new"|"change">("new")
    // const initIsAttend = () => {
    //     if (propsIsAttend !== undefined) {
    //         setNewOrChange("change")
    //         return propsIsAttend
    //     }
    //     return false
    // }
    // const initMessage = () => {
    //     if (propsMessage === null) {
    //         return ''
    //     }
    //     if (propsMessage !== undefined) {
    //         return propsMessage
    //     }
    //     return '欠席します.'
    // }
    const [isAttend, setIsAttend] = useState(false)
    const [message,setMessage] = useRecoilState(messageState)
    console.log("betuppe-zi",message)
    const [successMessage, setSuccessMessage] = useState('')
    const [userId, setUserId] = useRecoilState(userIdState)
    console.log("new or change",newOrChange)
    const handleAttned = (message: string, isAttend: boolean) => {
        setIsAttend(isAttend)
        // setResponseMessage(message + responseMessage)
    }
    
    const postResponse = () => {
        const stateMaker = new StateMakerForNewAttendanceResponseRegist(userId, eventId, isAttend, message)
        stateMaker.returnErrorAndSuccessMessage().then((data) => {
            if (data.success) {
                setSuccessMessage(data.success)
            }
            if (data.error) {
                setSuccessMessage(data.error)
            }
        })
    }
    // useEffect(() => {
    //     if (isAttend) {
    //         setResponseMessage('出席します.')
    //         return
    //     }
    //     setResponseMessage('欠席します.')
    // }, [isAttend])
    return (
        <Card className={classes.root}>
            <CardContent>
                <ButtonContainer>
                    <MUIButton label={'出席'} onClick={() => handleAttned('出席します.', true)} color={'primary'} />
                    <MUIButton label={'欠席'} onClick={() => handleAttned('欠席します.', false)} color={'secondary'} />
                </ButtonContainer>
                <MultilineTextFields
                    placeholder={'メッセージ'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendButton onClick={postResponse} />
            </CardContent>
        </Card>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    display-direction: row;
`
