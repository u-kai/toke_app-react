type WeekOfDays = '月' | '火' | '水' | '木' | '金' | '土' | '日'
export class DateOperater {
    private day: number
    private month: number
    private year: number
    private weekOfDay: WeekOfDays | string
    constructor() {
        const date = new Date()
        this.day = date.getDate()
        this.month = date.getMonth() + 1
        this.year = date.getFullYear()
        this.weekOfDay = this.getWeekOfDay()
    }
    private getWeekOfDay = (): WeekOfDays | string => {
        const date = new Date()
        const err = 'Error coused!Not Return weekOfDay'
        switch (date.getDay()) {
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
            case 7:
                return '日'
            default:
                return err
        }
    }
    displayToday = (): string => {
        return `${this.year}/${this.formatMonth()}/${this.day}(${this.weekOfDay})`
    }
    private formatMonth = (): string => {
        if (this.month < 10) {
            return `0${this.month}`
        }
        return this.month.toString()
    }
    forMaterialUI = () => {
        return `${this.year}-${this.formatMonth()}-${this.day}T10:00`
    }
}
