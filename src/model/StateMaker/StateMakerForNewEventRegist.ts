import { StateMakerForNewSomething } from 'model/StateMaker/StateMakerForNewSomething'
import { DataPosterForNewEventRegist } from 'model/DataPoster/DataPosterForNewEventRegist'


export class StateMakerForNewEventRegist extends StateMakerForNewSomething {
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
        super(
            new DataPosterForNewEventRegist(
                purpose,
                bring,
                describe,
                organizer_id,
                organizer_name,
                location,
                start_date,
                end_date,
                memberIds
            )
        )
    }
}
