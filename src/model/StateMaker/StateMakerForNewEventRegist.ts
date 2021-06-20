import { StateMaker } from 'model/StateMaker/StateMaker'
import { DataPosterForNewEventRegist } from 'model/DataPoster/DataPosterForNewEventRegist'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'

export class StateMakerForNewEventRegist extends StateMaker {
    constructor(
        purpose: string,
        bring: string,
        describe: string,
        organizer_id: string,
        organizer_name: string,
        location: string,
        start_date: string,
        end_date: string,
        memberIds: string[]
    ) {
        super(
            new DataPosterForNewEventRegist(
                purpose,
                bring,
                describe,
                organizer_id,
                organizer_name,
                location,
                start_date,
                end_date,
                memberIds
            )
        )
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError(
            'エラーが発生しました．データが反映されていません．もう一度送信してください'
        )
    }
    private returnSuccess = (data: BackendReturn): string | '' => {
        if (this.factoryConverter(data).returnSuccessResults() === undefined) {
            return ''
        }
        return '送信が完了しました'
    }
    returnErrorAndSuccessMessage = async () => {
        return this.postData().then((data: BackendReturn) => {
            return { error: this.returnError(data), success: this.returnSuccess(data) }
        })
    }
}
