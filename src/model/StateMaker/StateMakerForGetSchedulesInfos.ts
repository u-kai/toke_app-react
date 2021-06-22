import { DataPosterForGetSchedulesInfos } from 'model/DataPoster/DataPosterForGetSchedulesInfos'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { StateMaker } from 'model/StateMaker/StateMaker'
import { ScheduleInfoResults } from 'types/backend-return-tyeps/ScheduleInfo'

export class StateMakerForGetSchedulesInfo extends StateMaker {
    constructor(url:string,userId: string) {
        super(new DataPosterForGetSchedulesInfos(url,userId))
    }
    returnError = (data: BackendReturn): string | '' => {
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
