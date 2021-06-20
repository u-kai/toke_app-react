import {postAndReturnResponseToJson} from "functions/postAndReturnResponseToJson"
import {BackendResultsChecker} from "model/BackendResultsChecker"
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
export class DataPoster {
    url:string
    postData:{[key:string]:string}
    constructor(url:string,postKeys:string[],postValues:string[]){
        this.url = url
        this.postData = this.createPostData(postKeys,postValues)
    }
    private createPostData = (postKeys:string[],postValues:string[]) => {
        let postData:{[key:string]:string} = {}
        for(let i=0;i<postKeys.length;i++){
            postData[postKeys[i]] = postValues[i]
        }
        return postData
    }
    private postAndReturnPromiseJson = () => {
        return postAndReturnResponseToJson(this.postData,this.url)
    }
    private resultsChekerFactory = async() => {
        return this.postAndReturnPromiseJson()
        .then((results:BackendReturn)=>{
            return new BackendResultsChecker(results)
        })
    }
    
}