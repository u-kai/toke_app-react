import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import styled from 'styled-components'
import React, { useContext, useCallback } from 'react'
import { MultilineTextFields } from 'components/atoms/MultilineTextFileds'
import { SendButton } from 'components/atoms/SendButton'
import { MUIButton } from 'components/atoms/MUIButton'
import { ResponseInfoContext } from 'providers/ResponseInfoProvider'
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
    onSendButtonClick: () => void
}
export const ResponseComponent: React.VFC<Props> = React.memo((props) => {
    const classes = useStyles()

    const { onSendButtonClick } = props
    const context = useContext(ResponseInfoContext)
    const { responseInfo, responseInfoDispatch } = context
    const onClickToAbsent = useCallback(() => {
        responseInfoDispatch({ type: 'selectAbsent' })
    }, [])
    const onClickToAttend = useCallback(() => {
        responseInfoDispatch({ type: 'selectAttend' })
    }, [])
    return (
        <Card className={classes.root}>
            <CardContent>
                <ButtonContainer>
                    <MUIButton
                        label={'出席'}
                        onClick={onClickToAttend}
                        color={'primary'}
                        disable={responseInfo.isPush.attend}
                    />
                    <MUIButton
                        label={'欠席'}
                        onClick={onClickToAbsent}
                        color={'secondary'}
                        disable={responseInfo.isPush.absent}
                    />
                    <AbsentOrAttend>{responseInfo.choiceMessage}</AbsentOrAttend>
                </ButtonContainer>
                <MultilineTextFields
                    placeholder={'メッセージ'}
                    value={responseInfo.responseMessage}
                    onChange={(e) => responseInfoDispatch({ type: 'inputMessage', value: e.target.value })}
                />
                <SendButton onClick={onSendButtonClick} />
            </CardContent>
        </Card>
    )
})

const ButtonContainer = styled.div`
    display: flex;
    display-direction: row;
    align-items: center;
`
const AbsentOrAttend = styled.span`
    font-size: 20px;
`
