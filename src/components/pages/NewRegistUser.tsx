import React, { useState, useReducer } from 'react'
import styled from 'styled-components'
import { LayoutTextField } from 'components/atoms/LayoutTextField'
import { SendButton } from 'components/atoms/SendButton'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { StateMakerForNewUserRegist } from 'model/StateMaker/StateMakerForNewUserRegist'
import { Link } from 'react-router-dom'
import { useNewRegistUserMutation } from 'types/generated/graphql'

const isRockInput = (success: string): boolean => {
    return success !== ''
}
type NewRegistUserInfo = {
    userName: string
    password: string
    //  message: {
    //      error: string
    //      success: string
    //  }
    message: {
        error?: 'エラーです．異なるユーザー名及び異なるパスワードを記入してください．'
        success?: '新規登録ありがとうございます．'
    }
    isSuccess: boolean
    isDisable: boolean
}
type ActionType = 'inputUserName' | 'inputPassword' | 'sendSuccess' | 'sendError'
const reducer = (state: NewRegistUserInfo, action: { type: ActionType; value: string }): NewRegistUserInfo => {
    switch (action.type) {
        case 'inputUserName':
            //return isRockInput(state.message.success) ? state : { ...state, userName: action.value }
            return state.isSuccess
                ? { ...state, message: { success: '新規登録ありがとうございます．' } }
                : { ...state, userName: action.value }
        case 'inputPassword':
            //return isRockInput(state.message.success) ? state : { ...state, password: action.value }
            return state.isSuccess
                ? {
                      ...state,
                      message: { error: 'エラーです．異なるユーザー名及び異なるパスワードを記入してください．' },
                  }
                : { ...state, password: action.value }
        case 'sendSuccess':
            return {
                ...state,
                message: { success: '新規登録ありがとうございます．', error: undefined },
                isDisable: true,
            }
        case 'sendError':
            return {
                ...state,
                message: {
                    error: 'エラーです．異なるユーザー名及び異なるパスワードを記入してください．',
                    success: undefined,
                },
            }
        default:
            return state
    }
}
const initState: NewRegistUserInfo = {
    userName: '',
    password: '',
    message: {
        success: undefined,
        error: undefined,
    },
    isSuccess: false,
    isDisable: false,
}

export const NewRegistUser = () => {
    const [newRegisterUser, dispatch] = useReducer(reducer, initState)
    const [newRegistUser, { data, loading, error }] = useNewRegistUserMutation({
        variables: { userName: newRegisterUser.userName, userPassword: newRegisterUser.password },
    })
    const sendData = async () => {
        //const stateMakerForNewUser = new StateMakerForNewUserRegist(newRegisterUser.userName, newRegisterUser.password)
        try {
            newRegistUser()
        } catch (e) {
            console.log(e)
        }
        // stateMakerForNewUser.returnErrorAndSuccessMessage().then((data) => {
        //     if (data.error === '') {
        //         dispatch({ type: 'sendSuccess', value: 'ご登録ありがとうございます！' })
        //     }
        //     if (data.error !== '') {
        //         dispatch({ type: 'sendError', value: data.error })
        //     }
        // })
    }
    return (
        <Contener>
            <InputContener>
                <Title>新規登録</Title>
                <TextFieldContener>
                    <LayoutTextField
                        id="login_userName"
                        value={newRegisterUser.userName}
                        label={'名前'}
                        onChange={(e) => dispatch({ type: 'inputUserName', value: e.target.value })}
                    />
                </TextFieldContener>
                <TextFieldContener>
                    <LayoutTextField
                        id="login_password"
                        type="password"
                        value={newRegisterUser.password}
                        label={'パスワード'}
                        onChange={(e) => dispatch({ type: 'inputPassword', value: e.target.value })}
                    />
                </TextFieldContener>
                <ButtonContener>
                    <SendButton onClick={sendData} isDisabled={newRegisterUser.isDisable} />
                </ButtonContener>
            </InputContener>
            <ErrorContener>
                {data?.newRegistUser === false ? (
                    <SimpleAlert message={newRegisterUser.message.error!} severity={'error'} />
                ) : null}
            </ErrorContener>
            <SuccessContener>
                {data?.newRegistUser === true ? (
                    <SimpleAlert
                        message={newRegisterUser.message.success!}
                        severity={'success'}
                        children={<Link to={'/'}>ログインページでログインしてください</Link>}
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
    // position: absolute;
    grid-row: 1/2;
    grid-column: 2/3;
    margin-top: 10px;
    // margin-left:25%;
    // left: 39%;
    // top: 1%;
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
