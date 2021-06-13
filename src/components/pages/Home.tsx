import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { userIdState } from 'store/user_id'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ScheduleCard } from 'components/molecules/ScheduleCard'
import { returnUserAttendanceRequestsCount } from 'functions/retrunUserAttendanceRequestsCount'
export const Home = () => {
    const user_id = useRecoilValue(userIdState)
    const [userAttendaceRequestsCount, setUserAttendanceRequestsCount] = useState('')
    useEffect(() => {
        returnUserAttendanceRequestsCount(user_id).then((count) => {
            if (count === null) {
                return
            }
            setUserAttendanceRequestsCount(count.toString())
        })
    }, [])
    return <div>出席依頼:{userAttendaceRequestsCount}件</div>
}
