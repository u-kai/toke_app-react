import styled from 'styled-components'
import React, { useState, useContext, useEffect } from 'react'
import { SendButton } from 'components/atoms/SendButton'
import { LayoutTextField } from '../atoms/LayoutTextField'
import { useHistory, Link } from 'react-router-dom'
import { SimpleAlert } from '../atoms/SimpleAletert'
import { UserIdContext } from 'providers/UserIdProvider'
import { useLoginLazyQuery } from 'types/generated/graphql'
import { Progress } from 'components/atoms/Progress'
export const Login: React.VFC = () => {
    const history = useHistory()
    const { userInfo, dispatch } = useContext(UserIdContext)
    const { userId } = userInfo
    const [password, setPassword] = useState('udomaki')
    const [login, { data, loading, error }] = useLoginLazyQuery()
    const [isLoading, setIsLoading] = useState(false)
    const onClick = async () => {
        setIsLoading(true)
        login({
            variables: {
                input: {
                    userId,
                    password,
                },
            },
        })
    }
    useEffect(() => {
        if (error || data) {
            setIsLoading(false)
        }
    }, [data, error])
    useEffect(() => {
        if (data) {
            const { userInfo } = data.login
            if (userInfo) {
                const { userId, userName } = userInfo
                dispatch({ type: 'successLogin', userInfo: { userId, userName } })
                history.push('/home')
            }
            return
        }
    }, [data])
    return (
        <Contener>
            {loading !== undefined && isLoading ? (
                <ProgressContainer>
                    <Progress />
                </ProgressContainer>
            ) : null}
            <InputContener>
                <Title>ログイン</Title>
                <TextFieldContener>
                    <LayoutTextField
                        id="login_userId"
                        value={userId}
                        label={'Id'}
                        onChange={(e) => dispatch({ type: 'inputId', value: e.target.value })}
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
                {error !== undefined ? <SimpleAlert message={error.message} severity={'error'} /> : null}
            </ErrorContener>
        </Contener>
    )
}

const Contener = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 5% 30% 60% 1fr;
    grid-template-columns: 38% 24% 38%;
`
const InputContener = styled.div`
    width: 350px;
    height: 370px;
    grid-row: 3/4;
    grid-column: 2/3;
    border: solid 2px #95949a;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const ProgressContainer = styled.div`
    position: absolute;
    grid-row: 1/2;
    grid-column: 2/3;
    margin-right: auto;
    margin-left: auto;
`
const ErrorContener = styled.div`
    position: absolute;
    margin-right: auto;
    margin-left: auto;
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
