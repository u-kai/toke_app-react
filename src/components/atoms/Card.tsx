import styled from "styled-components"
import React,{VFC} from "react"

type Props = {

}

export const Card:VFC<Props> = (props) => {
    return(
        <CardContainer>
            <Date>2021/6/11(金)</Date>
            <Title>今日の予定</Title>
            <SUl>
                <Sli><a href="#">夕飯</a></Sli>
                <div>
                    <span>時間:</span><span>11時00分</span>
                </div>
                <div>
                    <span>場所:</span>はま寿司
                </div>
                <Sli>Tabel Tennis</Sli>
            </SUl>
        </CardContainer>
    )
}

const CardContainer = styled.div`
width:250px;
height:300px;
border:solid 2px gray;
box-shadow:0 3px 10px rgba(0,0,0,.16);
margin:20px;
border-radius:5px;
position:relative;
overflow:auto;
`
const Date = styled.div`
font-size:16px;
margin:5px;
`

const Title = styled.h2`
margin-top:-5px;
font-weight:bold;
position:absolute;
left:50%;
transform:translateX(-50%);
margin-bottom:10px;
`

const Sli = styled.li`
font-size:16px;
margin-left:-10px;
margin-top:10px;

`
const SUl = styled.ul`
padding-top:10px;
`
