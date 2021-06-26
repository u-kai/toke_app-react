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
import {isAttendState} from "store/isAttend"
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
}

export const ResponseComponent: React.VFC<Props> = (props) => {
    const classes = useStyles()
    const { eventId } = props
    const [newOrChange,setNewOrChange] = useState<"new"|"change">("new")
    const [isAttend, setIsAttend] = useRecoilState(isAttendState)
    const [isPush,setIsPush] = useState({
        attend:false,
        absent:false
    })
    const [message,setMessage] = useRecoilState(messageState)
    const [successMessage, setSuccessMessage] = useState('')
    const [userId, setUserId] = useRecoilState(userIdState)
    const [choiceMessage,setChoiceMessage] = useState("")
    const handleAttned = (isAttend:boolean) => {
        const clone = Object.assign({},isPush)
        if(isAttend === true){
            clone.attend = true
            clone.absent = false
            setIsPush(clone)
            setMessage("出席します．")
        }
        if (isAttend === false){
            clone.absent = true
            clone.attend = false
            setIsPush(clone)
            setMessage("欠席します．")
        }
        setIsAttend(isAttend)
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
    return (
        <Card className={classes.root}>
            <CardContent>
                <ButtonContainer>
                    <MUIButton label={'出席'} onClick={() => handleAttned(true)} color={'primary'} disable={isPush.attend}/>
                    <MUIButton label={'欠席'} onClick={() => handleAttned(false)} color={'secondary'} disable={isPush.absent} />
                    <AbsentOrAttend>{isAttend ? (<div>出席を選択されています．</div>):(<div>欠席を選択されています．</div>)}</AbsentOrAttend>
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
    align-items:center;
`
const AbsentOrAttend = styled.span`
    font-size:20px;
`