export type ScheduleInfo = {
    event_id: string
    purpose: string
    date?: string | null
    location: string
    describes: string
    bring: string
    organizer_id: string
    organizer_name: string
    start_date: string
    end_date: string
}
export type ScheduleInfoResults = ScheduleInfo[]
