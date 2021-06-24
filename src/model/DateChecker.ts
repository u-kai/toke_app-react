import { ScheduleInfoResults } from "types/backend-return-tyeps/ScheduleInfo"

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
    sortInfo = (infos:ScheduleInfoResults)=>{
        const dateIndex:{[key:string]:number} = {}
        const dateInfos = infos.map((info,i)=>{
            dateIndex[info.start_date] = i
            return info.start_date
        })
        
        const sortList = this.sortAsc(dateInfos)
        const indexs = sortList.map((date)=>dateIndex[date])
        return indexs.map(i=>infos[i])
        }

    sortAsc = (dates:string[]) => {
        const keyIsIndexValueIsDateValueTemp:{[key:string]:string} = {}
        const keyIsDateValueValueIsIndexTemp:{[key:string]:number} = {}
        const dateToValueList = dates.map((date,i)=>{
            keyIsDateValueValueIsIndexTemp[this.dateToValue(date).toString()] = i
            keyIsIndexValueIsDateValueTemp[i.toString()] = date
            return this.dateToValue(date)
        })
        const sortList = dateToValueList.sort()
        return sortList.map((data)=>{
            const index = keyIsDateValueValueIsIndexTemp[data]
            return keyIsIndexValueIsDateValueTemp[index]
        })
    }  
    private dateToValue = (date:string):number => {
        const dateInfo = new Date(date)
        return dateInfo.getFullYear() * 12 * 30 + dateInfo.getMonth() * 30 + dateInfo.getDate() + dateInfo.getHours() * 1/24 + dateInfo.getMinutes() * 1/1440
    } 
}
