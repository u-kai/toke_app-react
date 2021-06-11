import styled from "styled-components"
import React,{VFC} from "react"
import {DateOperater} from "model/DateOperater"

type Props = {
    title:string
    isDate:boolean
    schedules:string[]
    scheduleDates:string[]
    scheduleLocations:string[]
    scheduleUrl:string[]
}
const dateOperater = new DateOperater()
export const Card:VFC<Props> = (props) => {
    const today = dateOperater.displayToday()
    return(
        <CardContainer>
            {props.isDate ? (
                <Dates>{today}</Dates>
            ):(null)}
            <Title>{props.title}</Title>
            <ScheduleContainer>
            <SUl>
            {props.schedules.map((schedule,i)=>(
                <>
                <Sli><a href={props.scheduleUrl[i]}>{schedule}</a></Sli>
                    <div>
                        <span>時間:</span><span>{props.scheduleDates[i]}</span>
                    </div>
                    <div>
                        <span>場所:</span>{props.scheduleLocations[i]}
                    </div>
                </>
            ))}
            </SUl>
            </ScheduleContainer>
            
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
`
const Dates = styled.div`
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
margin-top:-5px;
`
const ScheduleContainer = styled.div`
position:absolute;
top:60px;
height:220px;
width:100%;
overflow:auto;
`