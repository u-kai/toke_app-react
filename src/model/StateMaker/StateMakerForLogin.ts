import { DataPosterForLogin } from 'model/DataPoster/DataPosterForLogin'
import { BtoFConverter } from 'model/BtoFConverter/BtoFConverter'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ReturnDataForLogin } from 'types/backend-return-tyeps/ReturnDataForLogin'
import {DataPoster} from "model/DataPoster/DataPoster"
import {StateMaker} from "model/StateMaker/StateMaker"
export class StateMakerForLogin extends StateMaker{
    constructor(userName: string, password: string) {
        super(new DataPosterForLogin(userName,password))
    }
    private factoryConverter = (backendReturnData: BackendReturn) => {
        return new BtoFConverter(backendReturnData)
    }
    private postData = () => {
        return this.dataPoster.postAndReturnPromiseJson()
    }
    private returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError('名前かパスワードが間違っています！')
    }

    private returnSelectResults = (data: BackendReturn): string | '' => {
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return ''
        }
        const castResult = selectResult as ReturnDataForLogin
        return castResult[0].user_id
    }
    returnErrorAndSelectResults = async (): Promise<string[]> => {
        return this.postData().then((data) => {
            return [this.returnError(data), this.returnSelectResults(data)]
        })
    }
}
