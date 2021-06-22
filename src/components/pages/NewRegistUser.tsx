import React, { useState } from 'react'
import styled from 'styled-components'
import { LayoutTextField } from 'components/atoms/LayoutTextField'
import { SendButton } from 'components/atoms/SendButton'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { StateMakerForNewUserRegist } from 'model/StateMaker/StateMakerForNewUserRegist'
import { useHistory,Link } from 'react-router-dom'
export const NewRegistUser = () => {
    const inputList = ['名前', 'パスワード']
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('thank')
    const history = useHistory()
    const onClick = () => {
        const stateMakerForNewUser = new StateMakerForNewUserRegist(userName, password)
        stateMakerForNewUser.returnErrorAndSuccessMessage().then((data) => {
            if(data.error === ""){
                setSuccessMessage(data.success)
            }
            setError(data.error)
        })
    }
    return (
        <Contener>
            <InputContener>
                <Title>新規登録</Title>
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
            </InputContener>
            <ErrorContener>
                {error.length !== 0 ? <SimpleAlert message={error} severity={'error'} /> : null}
            </ErrorContener>
            <SuccessContener>
                {successMessage.length !== 0 ? (
                <SimpleAlert 
                message={successMessage} 
                severity={'success'}
                children={<Link to={"/"}>ログインページでログインしてください</Link>}
                 />
                ) : null}
            </SuccessContener>
        </Contener>
    )
}

const Contener = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 50% 60% 1fr;
    grid-template-columns: 38% 24% 38%;
`
const InputContener = styled.div`
    width: 350px;
    height: 300px;
    grid-row: 2/3;
    grid-column: 2/3;
    border: solid 2px #95949a;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ErrorContener = styled.div`
    position: absolute;
    left: 39%;
    top: 1%;
`
const SuccessContener = ErrorContener
const TextFieldContener = styled.div`
    width: 100%;
    height: 80px;
    margin-left: 20px;
    padding-bottom: 20px;
`
const ButtonContener = styled.div`
    display: flex;
    justify-content: center;
`

const Title = styled.div`
    font-size: 30px;
    height: 40px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    border-bottom: solid 2px #95949a;
`
