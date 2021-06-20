import React, { useEffect, useState, memo } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { ScheduleCardProps } from 'types/ui-types/ScheduleCardProps'
import { userIdState } from 'store/user_id'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { ScheduleInfoResults, ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { BackendResultsChecker } from 'model/BackendResultsChecker'

import { SQLError } from 'types/backend-return-tyeps/SQLError'
import { ReturnDataForLogin } from 'types/backend-return-tyeps/ReturnDataForLogin'
import { ReturnDataForScheduleInfo } from 'types/backend-return-tyeps/ReturnDataForScheduleInfo'
export const Home = () => {
    // const user_id = useRecoilValue(userIdState)
    const [user_id, setTestUserId] = useRecoilState(userIdState)
    const [userAttendanceRequestsCount, setUserAttendanceRequestsCount] = useState('')
    const [scheduleCardDatas, setScheduleCardDatas] = useState<ScheduleInfoResults>([])

    useEffect(() => {
        postAndReturnResponseToJson({ user_id: user_id }, 'getSchedules/count').then((results: BackendReturn) => {
            const checker = new BackendResultsChecker(results)
            if (checker.isError()) {
                setUserAttendanceRequestsCount('エラーが起きてます．管理者にご報告ください．')
                return
            }
            if (checker.isSelect()) {
                const select = results.results.select![0]
                const count = Object.values(select)[0] as string
                setUserAttendanceRequestsCount(count)
            }
        })
        postAndReturnResponseToJson({ user_id: user_id }, 'getSchedules/ids').then((results: BackendReturn) => {
            const cheker = new BackendResultsChecker(results)
            if (cheker.isError()) {
                setUserAttendanceRequestsCount('エラーが起きてます．管理者にご報告ください．')
                setScheduleCardDatas([])
                return
            }
            if (cheker.isSelect()) {
                const select = results.results.select! as ReturnDataForScheduleInfo
                setScheduleCardDatas(select)
            }
        })
        postAndReturnResponseToJson({userId:user_id},"getGroups")
        .then((results:BackendReturn)=>{
            console.log("groups",results)
        })
    }, [user_id])
    //     const scheduleDataOperater = new ScheduleDataOperater(user_id)
    //     scheduleDataOperater.returnPromiseCount().then((count) => {
    //         setUserAttendanceRequestsCount(count)
    //     })
    //     scheduleDataOperater.returnPromiseScheduleInfos().then((scheduleInfoResults) => {
    //         setScheduleCardDatas(scheduleInfoResults)
    //     })
    // }, [user_id])

    return (
        <>
            <input id="test" value={user_id} onChange={(e) => setTestUserId(e.target.value)}></input>
            <div>出席依頼:{userAttendanceRequestsCount}件</div>
            {scheduleCardDatas.map((scuheduleCardData) => (
                <div key={`testtop${scuheduleCardData.attendance_request_id}`}>
                    <div key={`testto${scuheduleCardData.purpose}`}>title:{scuheduleCardData.purpose}</div>
                    <div key={`testto${scuheduleCardData.date}`}>date:{scuheduleCardData.date}</div>
                    <div key={`testto${scuheduleCardData.location}`}>location:{scuheduleCardData.location}</div>
                    <div key={`testto${scuheduleCardData.describes}`}>describe:{scuheduleCardData.describes}</div>
                    <div key={`testto${scuheduleCardData.bring}`}>bring:{scuheduleCardData.bring}</div>
                    <div key={`testto${scuheduleCardData.organizer_id}`}>
                        organizer_id:{scuheduleCardData.organizer_id}
                    </div>
                    <div key={`testto${scuheduleCardData.organizer_name}`}>name:{scuheduleCardData.organizer_name}</div>
                </div>
            ))}
        </>
    )
}
