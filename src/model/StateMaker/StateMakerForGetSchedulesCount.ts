import { DataPosterForGetSchedulesCount } from 'model/DataPoster/DataPosterForGetSchedulesCount'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ReturnDataForCount } from 'types/backend-return-tyeps/ReturnDataForCount'
import { StateMaker } from 'model/StateMaker/StateMaker'

export class StateMakerForGetScheduleSCount extends StateMaker {
    constructor(userId: string) {
        super(new DataPosterForGetSchedulesCount(userId))
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError('エラーが発生しています．管理者に問い合わせしてください．')
    }
    private returnCount = (data: BackendReturn): string | '' => {
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return ''
        }
        const castResult = selectResult as ReturnDataForCount
        return castResult[0]['count(*)']
    }
    returnErrorAndCount = async (): Promise<{ error: string | ''; count: string | '' }> => {
        return this.postData().then((data) => {
            return { error: this.returnError(data), count: this.returnCount(data) }
        })
    }
}
