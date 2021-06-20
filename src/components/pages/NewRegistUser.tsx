import React,{useState} from "react"
import styled from "styled-components"
import {LayoutTextField} from "components/atoms/LayoutTextField"
import {SendButton} from "components/atoms/SendButton"
import {SimpleAlert} from "components/atoms/SimpleAletert"
import { postAndReturnResponseToJson } from "functions/postAndReturnResponseToJson"
import { BackendReturn } from "types/backend-return-tyeps/BackendReturn"
import { BackendResultsChecker } from "model/BackendResultsChecker"
import { SupervisedUserCircle } from "@material-ui/icons"
export const NewRegistUser = () => {
    const inputList = ['名前', 'パスワード']
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [successMessage,setSuccessMessage] = useState("")
    const onClick = () => {
        const sendData = {
            userName:userName,
            password:password
        }
        postAndReturnResponseToJson(sendData,"newUserRegist")
        .then((results:BackendReturn)=>{
            console.log(results)
            const checker = new BackendResultsChecker(results)
            if(checker.isError()){
                setError(results.results.error!.sqlMessage)
            }
            if(checker.isOther()){
                console.log("success")
            }
            if(checker.isSelect()){
                console.log(results)
                setError("")
                setSuccessMessage("新規ご登録ありがとうございます")
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
            {successMessage.length !== 0 ? <SimpleAlert message={successMessage} severity={"success"}/>:null}
        </SuccessContener>
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
