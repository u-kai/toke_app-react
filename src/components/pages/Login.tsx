import styled from 'styled-components'
import { useState } from 'react'
import { SendButton } from 'components/atoms/SendButton'
import { LayoutTextField } from '../atoms/LayoutTextField'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { useHistory } from 'react-router-dom'
import { SimpleAlert } from '../atoms/SimpleAletert'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userIdState } from 'store/user_id'
import { userNameState } from 'store/user_name'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import {BackendResultsChecker} from "model/BackendResultsChecker"
import React from 'react'

export const Login = () => {
    const [error, setError] = useState('')
    const url = 'login'
    const history = useHistory()
    const inputList = ['名前', 'パスワード']
    const setUserId = useSetRecoilState(userIdState)
    const [userName, setUserName] = useRecoilState(userNameState)
    const [password, setPassword] = useState('udomaki')
    const onClick = () => {
        const sendData = {
            userName:userName,
            password:password
        }
        postAndReturnResponseToJson(sendData,url).then((results: BackendReturn) => {
            const checker = new BackendResultsChecker(results)
            if(checker.isError()){
                setError('名前かパスワードが間違っています！')
                return
            }
            if(checker.isSelect()){
                setError('')
                history.push('/home')
                const selectResults = results.results.select![0]
                if(selectResults['user_id']){
                    setUserId(selectResults['user_id'].toString())
                    return
                }
                setError("エラーが起きてます．管理者にご報告お願いします．")
                return
            }
            return 
        })
    }
    return (
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
    left: 40%;
    top: 1%;
`
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
