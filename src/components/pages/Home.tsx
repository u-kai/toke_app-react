import React, { useEffect, useState, memo } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userIdState } from 'store/user_id'
import { ScheduleInfoResults, ScheduleInfo } from 'types/backend-return-tyeps/ScheduleInfo'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { StateMakerForGetScheduleSCount } from 'model/StateMaker/StateMakerForGetSchedulesCount'
import { StateMakerForGetSchedulesInfo } from 'model/StateMaker/StateMakerForGetSchedulesInfos'
import { StateMakerForGetGroups } from 'model/StateMaker/StateMakerForGetGroups'
import {getNotResUrl} from "datas/urls/getNotRes"
import {getResedUrl} from "datas/urls/getResed"

export const Home = () => {
    const [userId, setTestUserId] = useRecoilState(userIdState)
    const [userAttendanceRequestsCount, setUserAttendanceRequestsCount] = useState('')
    const [scheduleCardDatas, setScheduleCardDatas] = useState<ScheduleInfoResults>([])

    useEffect(() => {
        const stateMakerForCount = new StateMakerForGetScheduleSCount(`${getNotResUrl}/count`,userId)
        stateMakerForCount.returnErrorAndCount().then((data) => {
            setUserAttendanceRequestsCount(data.count)
            console.log('error count', data.error)
        })

        const stateMakerForInfo = new StateMakerForGetSchedulesInfo(`${getNotResUrl}/ids`,userId)
        stateMakerForInfo.returnErrorAndInfos().then((data) => {
            console.log('info error', data.error)
            if (data.infos !== undefined) {
                setScheduleCardDatas(data.infos)
            }
            if (data.infos === undefined) {
                setScheduleCardDatas([])
            }
        })
        const stateMakerForResedCount = new StateMakerForGetScheduleSCount(`${getResedUrl}/count`,userId)
        stateMakerForResedCount.returnErrorAndCount().then((data)=>{
            console.log("resd count",data.count)
            console.log("resd count error",data.error)
        })
        const stateMakerForResedInfo = new StateMakerForGetSchedulesInfo(`${getResedUrl}/ids`,userId)
        stateMakerForResedInfo.returnErrorAndInfos().then((data) => {
            console.log("resd info error",data.error)
            console.log("resd info",data.infos)
        })
        const stateMakerForGetGroups = new StateMakerForGetGroups(userId)
        stateMakerForGetGroups.returnErrorAndGroups().then((data) => {
            console.log(data.error)
            console.log(data.groups.groupIds)
            console.log(data.groups.groupNames)
        })
    }, [userId])

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
