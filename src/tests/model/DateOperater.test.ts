import { DateOperater } from 'model/DateOperater'

const dateOperater = new DateOperater()
const today = dateOperater.displayToday()
const mToday = dateOperater.forMaterialUI()

it('check DateOperater', () => {
    expect(mToday).toBe('2021-06-13T10:00')
})
