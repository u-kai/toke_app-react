export type ScheduleInfo = {
    attendance_request_id: number
    purpose: string
    date: Date
    location: string
    describes: string
    bring: string
    organizer_id: number
    organizer_name: string
}
export type ScheduleInfoResults = ScheduleInfo[]
