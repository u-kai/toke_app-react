import React, { useEffect, useState, memo } from 'react'
import { useRecoilValue } from 'recoil'
import {ScheduleCardProps} from "types/ui-types/ScheduleCardProps"
import { userIdState } from 'store/user_id'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import {ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { ScheduleCard } from 'components/molecules/ScheduleCard'
import { ScheduleDataOperater } from 'model/ScheduleDataOperater'


export const Home = () => {
    const user_id = useRecoilValue(userIdState)
    const [userAttendaceRequestsCount, setUserAttendanceRequestsCount] = useState('')
    const [scheduleCardDatas, setScheduleCardDatas] = useState<ScheduleInfo[]>([])
    // const scheduleDataOperater = new ScheduleDataOperater(user_id)
    //     scheduleDataOperater.returnPromiseCount().then((count) => {
    //         setUserAttendanceRequestsCount(count)
    //     })
    //     scheduleDataOperater.returnPromiseScheduleInfos()
    useEffect(() => {
        console.log(user_id)
        const scheduleDataOperater = new ScheduleDataOperater(user_id)
        scheduleDataOperater.returnPromiseCount().then((count) => {
            setUserAttendanceRequestsCount(count)
        })
        scheduleDataOperater.returnPromiseScheduleInfos()
        .then((data)=>{
            console.log(data)
            // if(data.attendacne_request_id !== undefined)
            // setScheduleCardDatas([data])
        })
    }, [user_id])
    return (
        <>
    <div>出席依頼:{userAttendaceRequestsCount}件</div>
    {/* <ScheduleCard
        title={}
    ></ScheduleCard> */}
    </>

    )
}
