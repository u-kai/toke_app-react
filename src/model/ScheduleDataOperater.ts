import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { SelectResult } from 'types/backend-return-tyeps/SelectResult'
import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { SQLError } from 'types/backend-return-tyeps/SQLError'
import { WhereOperator } from 'types/post-data-types/WhereOperator'
import { ScheduleInfo, ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'
import {errorScheduleInfo} from "datas/errorScheduleInfo"
export class ScheduleDataOperater {
    private userId: string
    private tableName: string
    private selectUrl: 'select'
    constructor(userId: string) {
        this.userId = userId
        this.tableName = 'user_attendance_requests_info'
        this.selectUrl = 'select'
    }
    private isResults = (results: SelectResult | undefined): results is SelectResult => {
        return results !== undefined && results.length > 0
    }
    private isInfos = (results: any): results is ScheduleInfo => {
        return (
            results.attendance_request_id !== undefined &&
            results.purpose !== undefined &&
            results.date !== undefined &&
            results.location !== undefined &&
            results.describes !== undefined &&
            results.bring !== undefined &&
            results.organizer_id !== undefined &&
            results.organizer_name !== undefined
        )
    }
    private isStrings = (strings: (string | undefined)[]): strings is string[] => {
        const notUndefines = strings.filter((string) => string !== undefined)
        return notUndefines.length === strings.length
    }
    private makeSelectInfo = (
        selectDatas: string[],
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[],
        tableName?: string
    ): SelectInfo => {
        if (!tableName) {
            tableName = this.tableName
        }
        return {
            selectDatas: selectDatas,
            tableName: tableName,
            whereClaseElements: {
                whereKeys: whereKeys,
                whereValues: whereValues,
                whereOperators: whereOperators,
            },
        }
    }
    private makeSelectInfoForCount = (): SelectInfo => {
        return this.makeSelectInfo(['count(*)'], ['user_id', 'is_response'], [this.userId, 'false'], ['AND'])
    }
    private makeSelectInfoForIds = (): SelectInfo => {
        return this.makeSelectInfo(
            ['attendance_request_id'],
            ['user_id', 'is_response'],
            [this.userId, 'false'],
            ['AND']
        )
    }
    private makeSelectInfosForInfos = (ids: string[]): SelectInfo => {
        const whereKeys = ids.map((_) => 'attendance_request_id')
        const whereOperators: WhereOperator[] = ids.map((_) => 'OR')
        if (whereOperators.length >= 1) {
            whereOperators.pop()
        }
        return this.makeSelectInfo(['*'], whereKeys, ids, whereOperators, 'attendance_requests')
    }
    private returnCount = (select: SelectResult | undefined): string => {
        if (this.isResults(select)) {
            return Object.values(select[0]).toString()
        }
        return 'Error'
    }
    private returnIds = (select: SelectResult | undefined): string[] => {
        if (this.isResults(select)) {
            const ids = select.map((data) => {
                const id = Object.values(data)[0]
                if (id !== null && id !== undefined) {
                    return id.toString()
                }
            })
            if (this.isStrings(ids)) {
                return ids
            }
        }
        return ['Error']
    }
    private returnInfos = (selects: SelectResult | undefined): ScheduleInfoResults => {
        let results: ScheduleInfoResults = []
        if (selects) {
            results = selects.map((select) => {
                if (this.isInfos(select)) {
                    return select
                }
                return errorScheduleInfo
            })
        }
        return results
    }
    returnPromiseCount = (): Promise<string> => {
        return postAndReturnResponseToJson(this.makeSelectInfoForCount(), this.selectUrl).then(
            (results: BackendReturn) => {
                return this.returnCount(results.results.select)
            }
        )
    }
    private returnPromiseScheduleIds = (): Promise<string[]> => {
        return postAndReturnResponseToJson(this.makeSelectInfoForIds(), this.selectUrl).then(
            (results: BackendReturn) => {
                console.log('attendanceIds', results.results.select)
                return this.returnIds(results.results.select)
            }
        )
    }
    returnPromiseScheduleInfos = (): Promise<ScheduleInfoResults> => {
        return this.returnPromiseScheduleIds().then((ids: string[]) => {
            console.log("ids",ids)
            return postAndReturnResponseToJson(this.makeSelectInfosForInfos(ids), this.selectUrl).then(
                (results: BackendReturn) => {
                    return this.returnInfos(results.results.select)
                }
            )
        })
    }
}
