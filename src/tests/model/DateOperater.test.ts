import { DateOperater } from 'model/DateOperater'

const dateOperater = new DateOperater()
const today = dateOperater.displayToday()

it('check DateOperater', () => {
    expect(today).toBe('2021/06/11(金)')
})
