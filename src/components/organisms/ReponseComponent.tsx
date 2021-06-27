import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import styled from 'styled-components'
import { useEffect, useState,useReducer } from 'react'
import { StateMakerForNewAttendanceResponseRegist } from 'model/StateMaker/StateMakerForNewAttendanceResponseRegist'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { userIdState } from 'store/user_id'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { SendButton } from 'components/atoms/SendButton'
import { MUIButton } from 'components/atoms/MUIButton'
import { messageState } from 'store/message'
import { isAttendState } from 'store/isAttend'
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

type ActionType = "pushAttend" | "pushAbsent" | "inputMessage" | "sendSuccess" | "sendError"
type ResponseComponentState = {
    isPush:{
        attend:boolean
        absent:boolean
    }
    isAttend:boolean
    responseMessage:string
    choiceMessage:"欠席を選択されています．"|"出席を選択されています．"
    bannerMessage:{
        success:string
        error:string
    }
}

const reducer = (state:ResponseComponentState,action:{type:ActionType,value:string}):ResponseComponentState => {
    switch(action.type){
        case "inputMessage":
            return {...state,responseMessage:action.value}
        case "pushAbsent":
            return {...state,isPush:{attend:false,absent:true},isAttend:false,choiceMessage:"欠席を選択されています．",responseMessage:action.value}
        case "pushAttend":
            return {...state,isPush:{attend:true,absent:false},isAttend:true,choiceMessage:"出席を選択されています．",responseMessage:action.value,}
        case "sendError":
            return {...state,bannerMessage:{error:action.value,success:""}}
        case "sendSuccess":
            return {...state,bannerMessage:{success:action.value,error:""}}
        default:
            return state
    }
}
const initState:ResponseComponentState = {
    isAttend:false,
    isPush:{
        attend:false,
        absent:true
    },
    responseMessage:"欠席します．",
    choiceMessage:"欠席を選択されています．",
    bannerMessage:{
        success:"",
        error:""
    },
}
export const ResponseComponent: React.VFC<Props> = (props) => {
    const classes = useStyles()
    const { eventId } = props
    const [state,dispatch] = useReducer(reducer,initState)
    // const [message, setMessage] = useRecoilState(messageState)
    // const [successMessage, setSuccessMessage] = useState('')
    const [userId, setUserId] = useRecoilState(userIdState)
    const postResponse = () => {
        const stateMaker = new StateMakerForNewAttendanceResponseRegist(userId, eventId, state.isAttend, state.responseMessage)
        stateMaker.returnErrorAndSuccessMessage().then((data) => {
            if (data.success) {
                dispatch({type:"sendSuccess",value:"返信が成功しました！"})
            }
            if (data.error) {
                dispatch({type:"sendError",value:data.error})
            }
        })
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <ButtonContainer>
                    <MUIButton
                        label={'出席'}
                        onClick={() => dispatch({type:"pushAttend",value:"出席します．"})}
                        color={'primary'}
                        disable={state.isPush.attend}
                    />
                    <MUIButton
                        label={'欠席'}
                        onClick={() => dispatch({type:"pushAbsent",value:"欠席します．"})}
                        color={'secondary'}
                        disable={state.isPush.absent}
                    />
                    <AbsentOrAttend>
                        {state.choiceMessage}
                    </AbsentOrAttend>
                </ButtonContainer>
                <MultilineTextFields
                    placeholder={'メッセージ'}
                    value={state.responseMessage}
                    onChange={(e) => dispatch({type:"inputMessage",value:e.target.value})}
                />
                <SendButton onClick={postResponse} />
            </CardContent>
        </Card>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    display-direction: row;
    align-items: center;
`
const AbsentOrAttend = styled.span`
    font-size: 20px;
`
