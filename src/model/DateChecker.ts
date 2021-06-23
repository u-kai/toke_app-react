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
}
