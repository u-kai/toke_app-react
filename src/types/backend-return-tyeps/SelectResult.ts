import { ReturnDataForGetMembers } from './ReturnDataForGetMembers'
import { ReturnDataForCount } from 'types/backend-return-tyeps/ReturnDataForCount'
import { ReturnDataForLogin } from 'types/backend-return-tyeps/ReturnDataForLogin'
import { ReturnDataForScheduleInfo } from 'types/backend-return-tyeps/ReturnDataForScheduleInfo'
import { ReturnDataForGetGroups } from 'types/backend-return-tyeps/ReturnDataForGetGroups'
export type SelectResult =
    | ReturnDataForCount
    | ReturnDataForLogin
    | ReturnDataForScheduleInfo
    | ReturnDataForGetMembers
    | ReturnDataForGetGroups
