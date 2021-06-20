import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
import { BackendResultsChecker } from 'model/BackendResultsChecker'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
export class DataPoster {
    url: string
    postData: { [key: string]: string | string[] }
    constructor(url: string, postKeys: string[], postValues: (string | string[])[]) {
        this.url = url
        this.postData = this.createPostData(postKeys, postValues)
    }
    createPostData = (postKeys: string[], postValues: (string | string[])[]) => {
        const postData: { [key: string]: string | string[] } = {}
        for (let i = 0; i < postKeys.length; i++) {
            postData[postKeys[i]] = postValues[i]
        }
        return postData
    }
    postAndReturnPromiseJson = () => {
        return postAndReturnResponseToJson(this.postData, this.url)
    }
}
