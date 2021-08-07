import { ScheduleInfo, ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'

export class DateChecker {
    isToday = (date: string) => {
        const today = new Date()
        const compare = new Date(date)
        return (
            today.getFullYear() === compare.getFullYear() &&
            today.getMonth() === compare.getMonth() &&
            today.getDate() === compare.getDate()
        )
    }

    sortInfo = (infos: ScheduleInfoResults) => {
        const minDate: ScheduleInfo = {
            attendance_request_id: '',
            start_date: '1999-01-01',
            end_date: '',
            purpose: '',
            bring: '',
            location: '',
            describes: '',
            organizer_id: '',
            organizer_name: '',
            date: '',
        }
        let maxList: ScheduleInfoResults = [minDate]
        const clone = Object.assign({}, infos)
        let temp = 0
        for (let i = 0; i < infos.length; i++) {
            for (let j = 0; j < infos.length; j++) {
                if (this.dateToValue(maxList[i].start_date) <= this.dateToValue(clone[j].start_date)) {
                    maxList[i] = Object.assign({}, clone[j])
                    temp = j
                }
            }
            maxList = [...maxList, minDate]
            clone[temp] = minDate
        }
        maxList.pop()
        return maxList
    }
    sortAsc = (dates: string[]) => {
        const keyIsIndexValueIsDateValueTemp: { [key: string]: string } = {}
        const keyIsDateValueValueIsIndexTemp: { [key: string]: number } = {}
        const dateToValueList = dates.map((date, i) => {
            keyIsDateValueValueIsIndexTemp[this.dateToValue(date).toString()] = i
            keyIsIndexValueIsDateValueTemp[i.toString()] = date
            return this.dateToValue(date)
        })
        const sortList = dateToValueList.sort()
        return sortList.map((data) => {
            const index = keyIsDateValueValueIsIndexTemp[data]
            return keyIsIndexValueIsDateValueTemp[index]
        })
    }
    private dateToValue = (date: string): number => {
        const dateInfo = new Date(date)
        return (
            dateInfo.getFullYear() * 12 * 30 +
            dateInfo.getMonth() * 30 +
            dateInfo.getDate() +
            (dateInfo.getHours() * 1) / 24 +
            (dateInfo.getMinutes() * 1) / 1440
        )
    }
}
