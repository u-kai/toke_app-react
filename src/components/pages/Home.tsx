import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { userIdState } from 'store/user_id'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ScheduleCard } from 'components/molecules/ScheduleCard'
import { returnUserAttendanceRequestsCount } from 'functions/retrunUserAttendanceRequestsCount'
import {ScheduleDataOperater} from "model/ScheduleDataOperater"
import { count } from 'console'

export const Home = () => {
    const user_id = useRecoilValue(userIdState)
    console.log(user_id)
    const [userAttendaceRequestsCount, setUserAttendanceRequestsCount] = useState('')
    useEffect(() => {
        const scheduleDataOperater = new ScheduleDataOperater(user_id)
        scheduleDataOperater.returnPromiseCount().then((count)=>{
            setUserAttendanceRequestsCount(count)
        })
        // returnUserAttendanceRequestsCount(user_id).then((count) => {
        //     if (count === null) {
        //         return
        //     }
        //     setUserAttendanceRequestsCount(count.toString())
        // })
    }, [])
    return <div>出席依頼:{userAttendaceRequestsCount}件</div>
}
