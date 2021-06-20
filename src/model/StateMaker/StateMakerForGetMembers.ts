import { DataPosterForGetMembers } from 'model/DataPoster/DataPosterForGetMembers'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ReturnDataForGetMembers } from 'types/backend-return-tyeps/ReturnDataForGetMembers'
import { StateMaker } from 'model/StateMaker/StateMaker'

export class StateMakerForGetMembers extends StateMaker {
    constructor(userId: string) {
        super(new DataPosterForGetMembers(userId))
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError('エラーが起きてます．管理者にご報告ください．')
    }
    private returnMemberIdsAndNames = (data: BackendReturn) => {
        let memberIds: string[] = []
        let memberNames: string[] = []
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return {
                ids: memberIds,
                names: memberNames,
            }
        }
        const idsAndNames: {
            user_id: string
            user_name: string
        }[] = selectResult as ReturnDataForGetMembers
        idsAndNames.map((idAndName: { user_id: string; user_name: string }) => {
            memberIds = [...memberIds, idAndName.user_id]
            memberNames = [...memberNames, idAndName.user_name]
        })
        return {
            ids: memberIds,
            names: memberNames,
        }
    }
    returnErrorAndIdsNames = async () => {
        return this.postData().then((data) => {
            return { error: this.returnError(data), data: this.returnMemberIdsAndNames(data) }
        })
    }
}
