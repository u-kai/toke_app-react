import { DataPosterForLogin } from 'model/DataPoster/DataPosterForLogin'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ReturnDataForLogin } from 'types/backend-return-tyeps/ReturnDataForLogin'
import { StateMaker } from 'model/StateMaker/StateMaker'
import { DataPosterForUserName } from 'model/DataPoster/DataPosterForUserName'
export class StateMakerForUserName extends StateMaker {
    constructor(userId: string) {
        super(new DataPosterForUserName(userId))
    }

    private returnUserName = (data: BackendReturn): string | '' => {
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return ''
        }
        const castResult = selectResult as { name: string }[]
        return castResult[0].name
    }
    returnErrorAndUserName = async (): Promise<{ error: string | ''; userName: string | '' }> => {
        return this.postData().then((data) => {
            return { error: this.returnError(data), userName: this.returnUserName(data) }
        })
    }
}
