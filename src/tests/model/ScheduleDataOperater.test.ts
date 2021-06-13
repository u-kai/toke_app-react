import { ScheduleDataOperater } from 'model/ScheduleDataOperater'

const user_id = '0'
const scheduleDataOperater = new ScheduleDataOperater(user_id)
const count = scheduleDataOperater.returnPromiseCount()

it('test count', () => {
    expect(count.then((data) => console.log(data))).toBe('2')
})
