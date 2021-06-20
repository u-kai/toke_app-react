import {BtoFConverter} from "model/BtoFConverter/BtoFConverter"
import {DataPoster} from "model/DataPoster/DataPoster"
export class StateMaker {
    dataPoster:DataPoster
    constructor(dataPoster:DataPoster){
        this.dataPoster = dataPoster
    }
}
