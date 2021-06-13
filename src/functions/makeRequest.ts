import {LikeJson} from "types/LikeJson"
import {SelectInfo} from "types/SelectInfo"
export const  makeRequest = (bodyData:LikeJson|SelectInfo):RequestInit=>{
    return {
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyData)
        }
    }