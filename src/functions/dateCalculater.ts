const add0 = (hourOrMinute: number) => {
    if (hourOrMinute < 10) {
        return `0${hourOrMinute}`
    }
    return hourOrMinute.toString()
}
export const dateCalculater = (datetime: string, hourAndminutes: string): string => {
    const dt: Date = new Date(datetime)
    const toDate: Date = new Date(
        `${dt.getFullYear()}-${add0(dt.getMonth() + 1)}-${add0(dt.getDate())} ${hourAndminutes}`
    )
    const hours: number = dt.getHours() + toDate.getHours()
    const minutes: number = dt.getMinutes() + toDate.getMinutes()
    dt.setHours(hours)
    dt.setMinutes(minutes)

    return `${dt.getFullYear()}-${add0(dt.getMonth() + 1)}-${add0(dt.getDate())}T${add0(dt.getHours())}:${add0(
        dt.getMinutes()
    )}`
}
