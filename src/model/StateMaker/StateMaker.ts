import {BtoFConverter} from "model/BtoFConverter/BtoFConverter"
import {DataPoster} from "model/DataPoster/DataPoster"
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
export class StateMaker {
    dataPoster:DataPoster
    constructor(dataPoster:DataPoster){
        this.dataPoster = dataPoster
    }
    factoryConverter = (backendReturnData: BackendReturn) => {
        return new BtoFConverter(backendReturnData)
    }
    postData = () => {
        return this.dataPoster.postAndReturnPromiseJson()
    }
    returnError = (data: BackendReturn): string | '' => {
        return this.factoryConverter(data).returnError()
    }
}
