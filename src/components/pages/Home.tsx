import React, { useEffect, useState,memo } from 'react'
import { useRecoilValue } from 'recoil'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { userIdState } from 'store/user_id'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ScheduleCard } from 'components/molecules/ScheduleCard'
import { returnUserAttendanceRequestsCount } from 'functions/retrunUserAttendanceRequestsCount'
import { ScheduleDataOperater } from 'model/ScheduleDataOperater'


export const Home = () => {
    const user_id = useRecoilValue(userIdState)
    const [userAttendaceRequestsCount, setUserAttendanceRequestsCount] = useState('')
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
    }, [user_id])
    return <div>出席依頼:{userAttendaceRequestsCount}件</div>
}
