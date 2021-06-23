import { DateChecker } from 'model/DateChecker'

const today = '2021-06-23T01:00:00.000Z'
const dataChecker = new DateChecker()
it('test is today', () => {
    expect(dataChecker.isToday(today)).toBe(true)
})
