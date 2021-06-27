import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import styled from 'styled-components'
import { useEffect, useState, useReducer,useContext } from 'react'
import { StateMakerForNewAttendanceResponseRegist } from 'model/StateMaker/StateMakerForNewAttendanceResponseRegist'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { userIdState } from 'store/user_id'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { SendButton } from 'components/atoms/SendButton'
import { MUIButton } from 'components/atoms/MUIButton'
import {IsAttendAndMessageContext} from "providers/IsAttendAndMessage"
import {UserIdContext} from "providers/UserIdProvider"
import {BannerMessageContext} from "providers/BannerMessage"
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

type ActionType = 'pushAttend' | 'pushAbsent' | 'inputMessage' | 'sendSuccess' | 'sendError'
type ResponseComponentState = {
    isPush: {
        attend: boolean
        absent: boolean
    }
    choiceMessage: '欠席を選択されています．' | '出席を選択されています．'
}

const reducer = (
    state: ResponseComponentState,
    action: { type: ActionType}
): ResponseComponentState => {
    switch (action.type) {
        case 'pushAbsent':
            return {
                ...state,
                isPush: { attend: false, absent: true },
                choiceMessage: '欠席を選択されています．',
            }
        case 'pushAttend':
            return {
                ...state,
                isPush: { attend: true, absent: false },
                choiceMessage: '出席を選択されています．',
            }
        default:
            return state
    }
}
const initState: ResponseComponentState = {
    isPush: {
        attend: false,
        absent: true,
    },
    choiceMessage: '欠席を選択されています．',
}
export const ResponseComponent: React.VFC<Props> = (props) => {
    const classes = useStyles()
    const { eventId } = props
    const [isPushAndChoiceMessage, isPushAndChoiceMessageDispatch] = useReducer(reducer, initState)
    const context = useContext(IsAttendAndMessageContext)
    const {isAttendAndMessage,isAttendAndMessageDispatch} = context
    const userIdContext = useContext(UserIdContext)
    const {userInfo} = userIdContext
    const bannerMessageContext  = useContext(BannerMessageContext)
    const {bannerDispatch} = bannerMessageContext
    const postResponse = () => {
        const stateMaker = new StateMakerForNewAttendanceResponseRegist(
            userInfo.userId,
            eventId,
            isAttendAndMessage.isAttend,
            isAttendAndMessage.responseMessage
        )
        stateMaker.returnErrorAndSuccessMessage().then((data) => {
            if (data.success) {
                bannerDispatch({ type: 'setSuccess', value: '返信が成功しました！' })
            }
            if (data.error) {
                bannerDispatch({ type: 'setError', value: data.error })
            }
        })
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <ButtonContainer>
                    <MUIButton
                        label={'出席'}
                        onClick={() => isPushAndChoiceMessageDispatch({ type: 'pushAttend'})}
                        color={'primary'}
                        disable={isPushAndChoiceMessage.isPush.attend}
                    />
                    <MUIButton
                        label={'欠席'}
                        onClick={() => isPushAndChoiceMessageDispatch({ type: 'pushAbsent'})}
                        color={'secondary'}
                        disable={isPushAndChoiceMessage.isPush.absent}
                    />
                    <AbsentOrAttend>{isPushAndChoiceMessage.choiceMessage}</AbsentOrAttend>
                </ButtonContainer>
                <MultilineTextFields
                    placeholder={'メッセージ'}
                    value={isAttendAndMessage.responseMessage}
                    onChange={(e) => isAttendAndMessageDispatch({ type: 'inputMessage', value: e.target.value })}
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
