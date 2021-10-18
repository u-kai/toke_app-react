import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { LayoutTextField } from 'components/atoms/LayoutTextField'
import { SendButton } from 'components/atoms/SendButton'
import { SimpleAlert } from 'components/atoms/SimpleAletert'
import { Link } from 'react-router-dom'
import { useNewUserRegistMutation } from 'types/generated/graphql'

type NewRegistUserInfo = {
    userName: string
    password: string
    message: {
        error?: 'エラーです．異なるユーザー名及び異なるパスワードを記入してください．' | string
        success?: '新規登録ありがとうございます．' | string
    }
    isDisable: boolean
}
type ActionType = 'inputUserName' | 'inputPassword' | 'sendSuccess' | 'sendError'
const reducer = (state: NewRegistUserInfo, action: { type: ActionType; value: string }): NewRegistUserInfo => {
    switch (action.type) {
        case 'inputUserName':
            return state.isDisable
                ? { ...state, message: { success: '新規登録ありがとうございます．' } }
                : { ...state, userName: action.value }
        case 'inputPassword':
            return state.isDisable
                ? {
                      ...state,
                      message: { error: 'エラーです．異なるユーザー名及び異なるパスワードを記入してください．' },
                  }
                : { ...state, password: action.value }
        case 'sendSuccess':
            return action.value === ''
                ? {
                      ...state,
                      message: { success: '新規登録ありがとうございます．', error: undefined },
                      isDisable: true,
                  }
                : { ...state, message: { success: action.value, error: undefined }, isDisable: true }
        case 'sendError':
            return action.value === ''
                ? {
                      ...state,
                      message: {
                          error: 'エラーです．異なるユーザー名及び異なるパスワードを記入してください．',
                          success: undefined,
                      },
                      isDisable: false,
                  }
                : { ...state, message: { error: action.value, success: undefined } }

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
    isDisable: false,
}

export const NewRegistUser: React.VFC = () => {
    const [newRegisterUser, dispatch] = useReducer(reducer, initState)
    const [newRegistUser, { data }] = useNewUserRegistMutation({
        variables: {
            input: {
                userName: newRegisterUser.userName,
                password: newRegisterUser.password,
            },
        },
    })
    const sendData = async () => {
        try {
            await newRegistUser()
        } catch (e) {
            dispatch({ type: 'sendError', value: 'サーバーがダウンしています．管理者に問い合わせください．' })
        }
    }
    useEffect(() => {
        if (data?.newRegistUser) {
            dispatch({ type: 'sendSuccess', value: '' })
        }
        if (data?.newRegistUser === false) {
            dispatch({ type: 'sendError', value: '' })
        }
    }, [data])
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
                {data?.newRegistUser === false && newRegisterUser.message.error !== undefined ? (
                    <SimpleAlert message={newRegisterUser.message.error} severity={'error'} />
                ) : null}
            </ErrorContener>
            <SuccessContener>
                {data?.newRegistUser === true && newRegisterUser.message.success ? (
                    <SimpleAlert
                        message={newRegisterUser.message.success}
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
