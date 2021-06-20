import { DataPosterForGetGroups } from 'model/DataPoster/DataPosterForGetGroups'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { ReturnDataForGetGroups } from 'types/backend-return-tyeps/ReturnDataForGetGroups'
import { StateMaker } from 'model/StateMaker/StateMaker'
export class StateMakerForGetGroups extends StateMaker {
    constructor(userId: string) {
        super(new DataPosterForGetGroups(userId))
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError('グループが見つかりませんでした．')
    }
    private returnGroups = (data: BackendReturn): { groupIds: string[]; groupNames: string[] } => {
        let groupIds: string[] = []
        let groupNames: string[] = []
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return { groupIds: groupIds, groupNames: groupNames }
        }
        const groups = selectResult as ReturnDataForGetGroups
        groups.map((groupInfo) => {
            groupIds = [...groupIds, groupInfo.group_id]
            groupNames = [...groupNames, groupInfo.group_name]
        })
        return { groupIds: groupIds, groupNames: groupNames }
    }
    returnErrorAndGroups = async (): Promise<{
        error: string | ''
        groups: { groupIds: string[]; groupNames: string[] }
    }> => {
        return this.postData().then((data) => {
            console.log(data)
            return { error: this.returnError(data), groups: this.returnGroups(data) }
        })
    }
}
