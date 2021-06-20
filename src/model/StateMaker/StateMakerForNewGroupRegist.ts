import {StateMakerForNewSomething} from "model/StateMaker/StateMakerForNewSomething"
import {DataPosterForNewGroupRegist} from "model/DataPoster/DataPosterForNewGroupRegist"
export class StateMakerForNewGroupRegist extends StateMakerForNewSomething{
    constructor(memberIds:string[],groupName:string){
        super(new DataPosterForNewGroupRegist(memberIds,groupName))
    }
}