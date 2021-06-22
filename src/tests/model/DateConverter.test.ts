import {DateConverter} from "model/DateConverter"

const start = "2021-06-21T01:00:00.000Z"
const end = "2021-06-20T01:30:00.000Z"
const converter = new DateConverter()
const a = converter.returnWeekOfDay()
const displayFormat = converter.displayDateRange(start,end)
const today = converter.displayToday()
it("test display",()=>{
    expect(displayFormat).toBe("2021/06/21(月) 10:00~10:30")
    expect(a).toBe("火")
    expect(today).toBe("2021/06/22(火)")
})