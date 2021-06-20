import { DataPoster } from 'model/DataPoster/DataPoster'

const url = 'newEventRegist'
const postKeys = [
    'purpose',
    'bring',
    'describe',
    'organizer_id',
    'organizer_name',
    'location',
    'start_date',
    'end_date',
    'memberIds',
]

export class DataPosterForNewEventRegist extends DataPoster {
    constructor(
        purpose: string,
        bring: string,
        describe: string,
        organizer_id: string,
        organizer_name: string,
        location: string,
        start_date: string,
        end_date: string,
        memberIds: string[]
    ) {
        super(url, postKeys, [
            purpose,
            bring,
            describe,
            organizer_id,
            organizer_name,
            location,
            start_date,
            end_date,
            memberIds,
        ])
    }
}
