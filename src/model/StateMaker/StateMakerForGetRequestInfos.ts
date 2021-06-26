import { DataPosterForGetRequests } from 'model/DataPoster/DataPosterForGetRequests'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { StateMaker } from 'model/StateMaker/StateMaker'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'

export class StateMakerForGetRequestInfos extends StateMaker {
    constructor(userId: string) {
        super(new DataPosterForGetRequests(userId))
    }
    returnError = (data: BackendReturn): string | '' => {
        if (data.results.error?.sqlMessage === 'データが見つかりませんでした．') {
            return ''
        }
        return this.factoryConverter(data).returnError('エラーが起きてます．管理者にご報告ください．')
    }
    private reutrnInfos = (data: BackendReturn): ScheduleInfoResults | undefined => {
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return
        }
        const castResult = selectResult as ScheduleInfoResults
        return castResult
    }
    returnErrorAndInfos = async (): Promise<{ error: string | ''; infos: ScheduleInfoResults | undefined }> => {
        return this.postData().then((data) => {
            return { error: this.returnError(data), infos: this.reutrnInfos(data) }
        })
    }
}
