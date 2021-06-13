import { ScheduleDataOperater } from "model/ScheduleDataOperater"

export type ScheduleInfo = {
    attendance_request_id: number
    purpose: string
    date: Date
    location: string
    describes: string
    bring: string
    organizer_id: number
}
export type ScheduleInfoResults = ScheduleInfo[]
