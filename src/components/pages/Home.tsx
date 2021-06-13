import React, { useEffect,useState } from 'react'
import {useRecoilValue} from "recoil"
import {postAndReturnResponseToJson} from "functions/postAndReturnResponseToJson"
import { userIdState } from 'store/user_id'
import {SelectInfo} from "types/SelectInfo"
import {BackendReturn} from "types/BackendReturn"
import {ScheduleCard} from "components/molecules/ScheduleCard"
import {returnUserAttendanceRequestsCount} from "functions/retrunUserAttendanceRequestsCount"
export const Home = () => {
    const user_id = useRecoilValue(userIdState)
    const [userAttendaceRequestsCount,setUserAttendanceRequestsCount] = useState("")
    // const countUserAttendanceRequests = () => {
    //     const selectInfo:SelectInfo = {
    //         selectDatas:["count(*)"],
    //         tableName:"user_attendance_requests_info",
    //         whereClaseElements:{
    //             whereKeys:["user_id","is_response"],
    //             whereValues:[user_id,"false"],
    //             whereOperators:["AND"]
    //         }
    //     }
    //         postAndReturnResponseToJson(selectInfo,"select")
    //         .then((results:BackendReturn)=>{
    //             if(results.results.error!==undefined){
    //                 return
    //             }
    //             if(results.results.select){
    //                 const count = Object.values(results.results.select[0])
    //                 setUserAttendanceRequestsCount(count.toString())
    //             }
    //         })
        
    // }
    console.log(user_id)
    useEffect(()=>{
        returnUserAttendanceRequestsCount(user_id)
        .then((count)=>{
            if(count === null){
                return
            }
            setUserAttendanceRequestsCount(count.toString())
        })
        // countUserAttendanceRequests()
    },[])
    return (
        <div>
            出席依頼:{userAttendaceRequestsCount}件
        </div>)
}
