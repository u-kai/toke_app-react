import { ResponseInfoContext } from 'providers/ResponseInfoProvider'
import {useContext,useReducer} from "react"
import { StateMakerForGetResponse } from 'model/StateMaker/StateMakerForGetResponse'
import { BannerMessageContext } from 'providers/BannerMessage'
export const useResponseInfo = () => {
    const responseInfoContext = useContext(ResponseInfoContext)
    const { responseInfoDispatch } = responseInfoContext
    const bannerMessageContext = useContext(BannerMessageContext)
    const { bannerMessage, bannerDispatch } = bannerMessageContext
    
    const fetchAndSetResponseInfo = (userId:string,id:string) => {
        const stateMaker = new StateMakerForGetResponse(userId,id)
        stateMaker.returnErrorAndResponseInfo().then((data) => {
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', value: data.error })
                return
            }
            if(data.error === "") {
                responseInfoDispatch({
                    type: 'setState',
                    setState: {
                        isAttend: data.responseInfo.isAttend,
                        responseMessage: data.responseInfo.message,
                    },
                })
                bannerDispatch({type:"resetMessage"})
            }
            
        })
    }
    
    return{fetchAndSetResponseInfo}
}