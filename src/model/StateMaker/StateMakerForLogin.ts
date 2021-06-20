import { DataPosterForLogin } from 'model/DataPoster/DataPosterForLogin'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ReturnDataForLogin } from 'types/backend-return-tyeps/ReturnDataForLogin'
import { StateMaker } from 'model/StateMaker/StateMaker'
export class StateMakerForLogin extends StateMaker {
    constructor(userName: string, password: string) {
        super(new DataPosterForLogin(userName, password))
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError('名前かパスワードが間違っています！')
    }

    private returnUserId = (data: BackendReturn): string | '' => {
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return ''
        }
        const castResult = selectResult as ReturnDataForLogin
        return castResult[0].user_id
    }
    returnErrorAndUserId = async (): Promise<{error:string | '',userId:string | ''}> => {
        return this.postData().then((data) => {
            return {error:this.returnError(data),userId:this.returnUserId(data)}
        })
    }
}
