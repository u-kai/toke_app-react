import styled from 'styled-components'
import React, { useState, useContext } from 'react'
import { SendButton } from 'components/atoms/SendButton'
import { LayoutTextField } from '../atoms/LayoutTextField'
import { useHistory, Link } from 'react-router-dom'
import { SimpleAlert } from '../atoms/SimpleAletert'
import { StateMakerForLogin } from 'model/StateMaker/StateMakerForLogin'
import { UserIdContext } from 'providers/UserIdProvider'
export const Login: React.VFC = () => {
    const [error, setError] = useState('')
    const history = useHistory()
    const context = useContext(UserIdContext)
    const { userInfo, dispatch } = context
    const [password, setPassword] = useState('')
    const onClick = () => {
        const stateMaker = new StateMakerForLogin(userInfo.userName, password)
        stateMaker.returnErrorAndUserId().then((errorAndUserId: { error: string | ''; userId: string | '' }) => {
            setError(errorAndUserId.error)
            dispatch({ type: 'inputId', value: errorAndUserId.userId })
            if (errorAndUserId.error === '') {
                history.push('/home')
            }
        })
    }
    return (
        <Contener>
            <InputContener>
                <Title>ログイン</Title>
                <TextFieldContener>
                    <LayoutTextField
                        id="login_userName"
                        value={userInfo.userName}
                        label={'名前'}
                        onChange={(e) => dispatch({ type: 'inputName', value: e.target.value })}
                    />
                </TextFieldContener>
                <TextFieldContener>
                    <LayoutTextField
                        id="login_password"
                        type="password"
                        value={password}
                        label={'パスワード'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </TextFieldContener>
                <ButtonContener>
                    <SendButton onClick={onClick} />
                </ButtonContener>
                <div>
                    <Link to="/newRegistUser">新規登録はこちら</Link>
                </div>
            </InputContener>
            <ErrorContener>
                {error.length !== 0 ? <SimpleAlert message={error} severity={'error'} /> : null}
            </ErrorContener>
        </Contener>
    )
}

const Contener = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 30% 60% 1fr;
    grid-template-columns: 38% 24% 38%;
`
const InputContener = styled.div`
    width: 350px;
    height: 370px;
    grid-row: 2/3;
    grid-column: 2/3;
    border: solid 2px #95949a;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const ErrorContener = styled.div`
    position: absolute;
    left: 40%;
    top: 1%;
`
const TextFieldContener = styled.div`
    width: 100%;
    height: 70px;
    margin-left: 20px;
    padding-bottom: 15px;
`
const ButtonContener = styled.div`
    display: flex;
    justify-content: center;
`

const Title = styled.div`
    width: 100%;
    font-size: 30px;
    height: 40px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    border-bottom: solid 2px #95949a;
`
