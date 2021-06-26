import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { StateMaker } from 'model/StateMaker/StateMaker'
import { DataPosterForGetResponseInfo } from 'model/DataPoster/DataPosterForGetResponseInfo'
import { ReturnDataForGetResponse } from 'types/backend-return-tyeps/ReturnDataForGetResponse'
type ResponseInfo = {
    message: string
    isAttend: boolean
}
export class StateMakerForGetResponse extends StateMaker {
    constructor(userId: string, eventId: string) {
        super(new DataPosterForGetResponseInfo(userId, eventId))
    }
    private returnResponseInfo = (data: BackendReturn): ResponseInfo => {
        const selectResult = this.factoryConverter(data).returnSelectResults()
        if (selectResult === undefined) {
            return { message: 'Error', isAttend: false }
        }
        const castedData: ReturnDataForGetResponse = selectResult as ReturnDataForGetResponse
        let isAttend = false
        if (castedData[0].is_attendance === 'true') {
            isAttend = true
        }
        return { message: castedData[0].message, isAttend: isAttend }
    }
    returnErrorAndResponseInfo = async (): Promise<{ error: string | ''; responseInfo: ResponseInfo }> => {
        return this.postData().then((data) => {
            return { error: this.returnError(data), responseInfo: this.returnResponseInfo(data) }
        })
    }
}
