import React,{useState} from "react"
import styled from "styled-components"


export const AttendanceRequests = () =>{
    const items = ["目的","日時","持ち物","概要"]
    const requestDates = ["夏祭りに関する会議","2021/07/01() 11:00~12:00","筆記用具","今年の夏祭りを開催するかしないか等について議論します"]
    return (
        <Container>
            <Title>出席依頼</Title>
            <ul >
                {items.map((item,i)=>(
                    <div key={`itemConteinar${item}`}style={{display:"flex",flexDirection:"row"}}>
                    <li key={`li${item}`}><span key={`${item}`}>{item}:</span></li><span key={`datas${requestDates[i]}`}>{requestDates[i]}</span>
                    </div>
                ))}
            </ul>
            <ResponseContainer>
                <button>出席</button>・<button>欠席</button>
                <p>返信</p>
                <div>
                    <textarea>
                        出席します．よろしくお願いいたします．
                    </textarea>
                </div>
                <div></div>
                <SendButton>送信する</SendButton>
            </ResponseContainer>
        </Container>
    )
    
}
const Container = styled.div`
height:700px;
width:80%;

`
const Title = styled.h1`
border-bottom:solid 3px black;
text-align:center;
`
const ResponseContainer = styled.div``

const SendButton = styled.button`
background-color:#00ffcc;
color:white;
width:200px;
height:80px;
box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
border:solid 2px transparent;
font-size:20px;
font-weight:bold;
cursor:pointer;
&:hover{
    border:solid 2px #00ffcc;
    color:#00ffcc;
    background-color:transparent;

}
`