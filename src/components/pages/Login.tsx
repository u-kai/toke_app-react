import styled, { keyframes } from 'styled-components'
import React, { useState } from 'react'
import { SendButton } from 'components/atoms/SendButton'
import { LayoutTextField } from '../atoms/LayoutTextField'
import { useHistory, Link } from 'react-router-dom'
import { SimpleAlert } from '../atoms/SimpleAletert'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'
import { userIdState } from 'store/user_id'
import { userNameState } from 'store/user_name'
import { StateMakerForLogin } from 'model/StateMaker/StateMakerForLogin'
export const Login = () => {
    const [error, setError] = useState('')
    const history = useHistory()
    const inputList = ['名前', 'パスワード']
    const setUserId = useSetRecoilState(userIdState)
    const [userName, setUserName] = useRecoilState(userNameState)
    const [password, setPassword] = useState('udomaki')
    const onClick = () => {
        const stateMaker = new StateMakerForLogin(userName, password)
        stateMaker.returnErrorAndUserId().then((errorAndUserId: { error: string | ''; userId: string | '' }) => {
            setError(errorAndUserId.error)
            setUserId(errorAndUserId.userId)
            if (errorAndUserId.error === '') {
                history.push('/home')
            }
        })
    }
    return (
        // <RecoilRoot>
        <Contener>
            <InputContener>
                <Title>ログイン</Title>
                <TextFieldContener>
                    <LayoutTextField
                        id="login_userName"
                        value={userName}
                        label={inputList[0]}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </TextFieldContener>
                <TextFieldContener>
                    <LayoutTextField
                        id="login_password"
                        type="password"
                        value={password}
                        label={inputList[1]}
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
        // </RecoilRoot>
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
