import { DataPosterForNewUserRegist } from 'model/DataPoster/DataPosterForNewUserRegist'
import { StateMakerForNewSomething } from 'model/StateMaker/StateMakerForNewSomething'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
export class StateMakerForNewUserRegist extends StateMakerForNewSomething {
    constructor(userName: string, password: string) {
        super(new DataPosterForNewUserRegist(userName, password))
    }
    returnSuccess = (data: BackendReturn): string | '' => {
        if (this.factoryConverter(data).returnSuccessResults() === undefined) {
            return ''
        }
        return '新規ご登録ありがとうございます'
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError(
            'エラーが発生しました．データが反映されていません．名前かパスワードを変更してください．'
        )
    }
}
