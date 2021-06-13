import { SelectInfo } from 'types/SelectInfo'
import { useRecoilValue } from 'recoil'
import { userIdState } from 'store/user_id'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'

export const returnUserAttendanceRequestsCount = (user_id: string) => {
    const selectInfo: SelectInfo = {
        selectDatas: ['count(*)'],
        tableName: 'user_attendance_requests_info',
        whereClaseElements: {
            whereKeys: ['user_id', 'is_response'],
            whereValues: [user_id, 'false'],
            whereOperators: ['AND'],
        },
    }
    return postAndReturnResponseToJson(selectInfo, 'select').then((results: BackendReturn) => {
        console.log(results)
        if (results.results.error !== undefined) {
            return 'Error!'
        }
        if (results.results.select) {
            const count = Object.values(results.results.select[0])
            console.log('!!!!!', count[0])
            return count[0]
        }
        return 'Error!'
    })
}
