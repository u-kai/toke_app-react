import {DataPoster} from "model/DataPoster/DataPoster"

const url = "newGroupRegist"
const postKeys = [
    "memberIds",
    "groupName"
]

export class DataPosterForNewGroupRegist extends DataPoster{
    constructor(memberIds:string[],groupName:string){
        super(url,postKeys,[memberIds,groupName])
    }
}