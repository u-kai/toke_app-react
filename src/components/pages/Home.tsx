import React, { useEffect, useState, memo } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { ScheduleCardProps } from 'types/ui-types/ScheduleCardProps'
import { userIdState } from 'store/user_id'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
import { ScheduleCard } from 'components/molecules/ScheduleCard'
import { ScheduleDataOperater } from 'model/ScheduleDataOperater'
import {postAndReturnResponseToJson} from "functions/postAndReturnResponseToJson"
import {BackendReturn} from "types/backend-return-tyeps/BackendReturn"
import { checkServerIdentity } from 'tls'
import { BackendResultsChecker } from 'model/BackendResultsChecker'
export const Home = () => {
    // const user_id = useRecoilValue(userIdState)
    const [user_id,setTestUserId] = useRecoilState(userIdState)
    const [userAttendanceRequestsCount, setUserAttendanceRequestsCount] = useState('')
    const [scheduleCardDatas, setScheduleCardDatas] = useState<ScheduleInfoResults>([])
    useEffect(() => {
        postAndReturnResponseToJson({user_id:user_id},"schedule/count")
        .then((results:BackendReturn)=>{
            const checker = new BackendResultsChecker(results)
            if(checker.isError()){
                setUserAttendanceRequestsCount("エラーが起きてます．管理者にご報告ください．")
                return
            }
        })
    },[user_id])
    //     const scheduleDataOperater = new ScheduleDataOperater(user_id)
    //     scheduleDataOperater.returnPromiseCount().then((count) => {
    //         setUserAttendanceRequestsCount(count)
    //     })
    //     scheduleDataOperater.returnPromiseScheduleInfos().then((scheduleInfoResults) => {
    //         setScheduleCardDatas(scheduleInfoResults)
    //     })
    // }, [user_id])
    console.log("scheduleCardDatas",scheduleCardDatas)

    return (
        <>  
            <input id="test" value={user_id} onChange={(e)=>setTestUserId(e.target.value)}></input>
            <div>出席依頼:{userAttendanceRequestsCount}件</div>
            {scheduleCardDatas.map((scuheduleCardData)=>(
                <div key={`testtop${scuheduleCardData.attendance_request_id}`}>
                <div key={`testto${scuheduleCardData.purpose}`}>title:{scuheduleCardData.purpose}</div>
                <div key={`testto${scuheduleCardData.date}`}>date:{scuheduleCardData.date}</div>
                <div key={`testto${scuheduleCardData.location}`}>location:{scuheduleCardData.location}</div>
                <div key={`testto${scuheduleCardData.describes}`}>describe:{scuheduleCardData.describes}</div>
                <div key={`testto${scuheduleCardData.bring}`}>bring:{scuheduleCardData.bring}</div>
                <div key={`testto${scuheduleCardData.organizer_id}`}>organizer_id:{scuheduleCardData.organizer_id}</div>
                <div key={`testto${scuheduleCardData.organizer_name}`}>name:{scuheduleCardData.organizer_name}</div>
                </div>
            ))}
        </>
    )
}
