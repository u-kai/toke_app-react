import { DataPosterForGetParitcipants } from 'model/DataPoster/DataPosterForGetParticipants'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { StateMaker } from 'model/StateMaker/StateMaker'
export class StateMakerForGetParticipants extends StateMaker {
    constructor(attendanceRequestId: string) {
        super(new DataPosterForGetParitcipants(attendanceRequestId))
    }
    returnError = (data: BackendReturn): string | '' => {
        if (data.results.error !== undefined && data.results.error.sqlMessage !== 'データが見つかりませんでした．') {
            return 'error something wrong at get participants!'
        }
        return ''
    }
    returnParticipants = (data: BackendReturn): string[] => {
        if (data.results.error?.sqlMessage === 'データが見つかりませんでした．') {
            return ['0人']
        }
        if (data.results.select !== undefined) {
            const userData = data.results.select as { user_name: string }[]
            return userData.map((data) => data.user_name)
        }
        return ['undefine']
    }
    returnErrorAndParticipants = async (): Promise<{
        error: string | ''
        participants: string[]
    }> => {
        return this.postData().then((data) => {
            return { error: this.returnError(data), participants: this.returnParticipants(data) }
        })
    }
}
