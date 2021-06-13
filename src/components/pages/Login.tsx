import styled from "styled-components"
import {useState} from "react"
import {SendButton} from "components/atoms/SendButton"
import {LayoutTextField} from "../atoms/LayoutTextField"
import {postAndReturnResposeToJson} from "functions/postAndReturnResponseToJson"
import {useHistory} from "react-router-dom"
import {SimpleAlert} from "../atoms/SimpleAletert"
import {useRecoilState} from "recoil"

export const Login = () => {
    const [error,setError] = useState("oyyg83019%")///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const url = "submitUser"
    const history = useHistory()
    const inputList:["user","password","host","db"] = ["user","password","host","db"]
    

    return(
        <Contener>
            <InputContener>
            <Title>
                Connection MySQL
            </Title>
            {inputList.map((state,i)=>(
                <TextFieldContener>
                     <LayoutTextField
                        type={state==="password" ? ("password") : ("text")}
                        value={stateList[i]}
                        label={state}
                        handleChange={setFunctions[state]}/>
                </TextFieldContener>
            ))}
            <ButtonContener>
            <SendButton
                value={"connection"}
                onClick={onClick}
            />
            </ButtonContener>
            </InputContener>
            <ErrorContener>
                {error.length !== 0 ? (
                    <SimpleAlerts message={error} severity={"error"}/>
                ):(
                    null
                )}
            </ErrorContener>
        </Contener>
    )
}

const Contener = styled.div`
width:100%;
height:100%;
display:grid;
grid-template-rows:30% 60% 1fr;
grid-template-columns:38% 24% 38%;
`
const InputContener = styled.div`
width:350px;
height:400px;
grid-row:2/3;
grid-column:2/3;
// display:flex;
// align-items:center;
// justify-content:center;
border:solid 2px #95949a;
overflow:auto;
`
const ErrorContener = styled.div`
position:absolute;
left:35%;
top:1%;
`
const TextFieldContener = styled.div`
width:100%;
height:50px;
display:flex;
justify-content:center;
padding-bottom:20px;
`
const ButtonContener = styled.div`

display:flex;
justify-content:center;
`

const Title = styled.div`
font-size:30px;
font-weight:bold;
display:flex;
justify-content:center;
border-bottom:solid 2px #95949a;
`