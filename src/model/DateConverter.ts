type WeekOfDays = '月' | '火' | '水' | '木' | '金' | '土' | '日'
export class DateConverter {
    private dateFactory = (date?: string): Date => {
        if (date) {
            return new Date(date)
        }
        return new Date()
    }
    private returnDay = (date?: string): number => {
        return this.dateFactory(date).getDate()
    }
    private returnMonth = (date?: string): number => {
        return this.dateFactory(date).getMonth() + 1
    }
    private returnYear = (date?: string): number => {
        return this.dateFactory(date).getFullYear()
    }
    private returnHour = (date?: string): number => {
        return this.dateFactory(date).getHours()
    }
    private returnMinute = (date?: string): number => {
        return this.dateFactory(date).getMinutes()
    }
    returnWeekOfDay = (date?: string): WeekOfDays | string => {
        const dt = this.dateFactory(date)
        const err = 'Error coused!Not Return weekOfDay'
        switch (dt.getDay()) {
            case 1:
                return '月'
            case 2:
                return '火'
            case 3:
                return '水'
            case 4:
                return '木'
            case 5:
                return '金'
            case 6:
                return '土'
            case 0:
                return '日'
            default:
                return err
        }
    }
    private displayFormat = (data: number): string => {
        if (data < 10) {
            return `0${data}`
        }
        return data.toString()
    }
    displayDateRange = (start: string, end: string) => {
        const displayYear = this.returnYear(start)
        const displayMonth = this.displayFormat(this.returnMonth(start))
        const displayDay = this.displayFormat(this.returnDay(start))
        const displayWeekOfDay = this.returnWeekOfDay(start)
        const displayStartTime = `${this.displayFormat(this.returnHour(start))}:${this.displayFormat(
            this.returnMinute(start)
        )}`
        const displayEndTime = `${this.displayFormat(this.returnHour(end))}:${this.displayFormat(
            this.returnMinute(end)
        )}`
        return `${displayYear}/${displayMonth}/${displayDay}(${displayWeekOfDay}) ${displayStartTime}~${displayEndTime}`
    }
    displayToday = (): string => {
        return `${this.returnYear()}/${this.displayFormat(this.returnMonth())}/${this.displayFormat(
            this.returnDay()
        )}(${this.returnWeekOfDay()})`
    }
    forMaterialUI = () => {
        return `${this.returnYear()}-${this.displayFormat(this.returnMonth())}-${this.displayFormat(
            this.returnDay()
        )}T10:00`
    }
}
