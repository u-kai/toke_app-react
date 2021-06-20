import React, { useEffect, useState, memo } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userIdState } from 'store/user_id'
import { ScheduleInfoResults, ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { StateMakerForGetScheduleSCount } from 'model/StateMaker/StateMakerForGetSchedulesCount'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
export const Home = () => {
    // const user_id = useRecoilValue(userIdState)
    const [userId, setTestUserId] = useRecoilState(userIdState)
    const [userAttendanceRequestsCount, setUserAttendanceRequestsCount] = useState('')
    const [scheduleCardDatas, setScheduleCardDatas] = useState<ScheduleInfoResults>([])

    useEffect(() => {
        const stateMakerForCount = new StateMakerForGetScheduleSCount(userId)
        stateMakerForCount.returnErrorAndCount().then((data)=>{
            setUserAttendanceRequestsCount(data.count)
            console.log("error count",data.error)
        })
        // postAndReturnResponseToJson({ user_id: user_id }, 'getSchedules/count').then((results: BackendReturn) => {
        //     const checker = new BackendResultsChecker(results)
        //     if (checker.isError()) {
        //         setUserAttendanceRequestsCount('エラーが起きてます．管理者にご報告ください．')
        //         return
        //     }
        //     if (checker.isSelect()) {
        //         const select = results.results.select![0]
        //         const count = Object.values(select)[0] as string
        //         setUserAttendanceRequestsCount(count)
        //     }
        // })
        // postAndReturnResponseToJson({ userId: userId }, 'getSchedules/ids').then((results: BackendReturn) => {
        //     const cheker = new BackendResultsChecker(results)
        //     if (cheker.isError()) {
        //         setUserAttendanceRequestsCount('エラーが起きてます．管理者にご報告ください．')
        //         setScheduleCardDatas([])
        //         return
        //     }
        //     if (cheker.isSelect()) {
        //         const select = results.results.select! as ReturnDataForScheduleInfo
        //         setScheduleCardDatas(select)
        //     }
        // })
        const stateMakerForInfo = new StateMakerForGetSchedulesInfo(userId)
        stateMakerForInfo.returnErrorAndInfos().then((data)=>{
            console.log("info error",data.error)
            if(data.infos !== undefined){
                setScheduleCardDatas(data.infos)
            }
        })
        postAndReturnResponseToJson({ userId: userId }, 'getGroups').then((results: BackendReturn) => {
            console.log('groups', results)
        })
    }, [userId])
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
            <input id="test" value={userId} onChange={(e) => setTestUserId(e.target.value)}></input>
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
