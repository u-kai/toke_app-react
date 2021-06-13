import { makeRequest } from 'functions/makeRequest'
import { LikeJson } from 'types/LikeJson'
import { devUrl } from 'datas/url'
import { SelectInfo } from 'types/SelectInfo'
export const postAndReturnResponseToJson = (sendDatas: LikeJson | SelectInfo, url: string) => {
    return fetch(`${devUrl}/${url}`, makeRequest(sendDatas)).then((res) => res.json())
}
