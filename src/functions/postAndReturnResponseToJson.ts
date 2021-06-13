import { makeRequest } from 'functions/makeRequest'
import { LikeJson } from 'types/LikeJson'
import { devUrl } from 'datas/url'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
export const postAndReturnResponseToJson = (sendDatas: LikeJson | SelectInfo | SelectInfo[], url: string) => {
    console.log("sendDatas",sendDatas,"url",url)
    return fetch(`${devUrl}/${url}`, makeRequest(sendDatas)).then((res) => res.json())
}
