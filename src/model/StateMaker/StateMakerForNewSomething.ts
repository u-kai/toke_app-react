import {StateMaker} from "model/StateMaker/StateMaker"
import {DataPoster} from "model/DataPoster/DataPoster"
import {BackendReturn} from "types/backend-return-tyeps/BackendReturn"

export class StateMakerForNewSomething extends StateMaker{
    constructor(dataPoster:DataPoster){
        super(dataPoster)
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError(
            'エラーが発生しました．データが反映されていません．もう一度送信してください'
        )
    }
    returnSuccess = (data: BackendReturn): string | '' => {
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