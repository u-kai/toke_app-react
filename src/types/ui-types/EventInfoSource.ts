import React from 'react'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'

export type EventInfoSource = {
    url: 'getNotRes' | 'getResed' | 'getEvent'
    info: ScheduleInfoResults
    huck: React.Dispatch<React.SetStateAction<ScheduleInfoResults>>
}
