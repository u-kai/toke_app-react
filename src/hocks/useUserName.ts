import { StateMakerForUserName } from 'model/StateMaker/StateMakerForUserName'
import { BannerMessageContext } from 'providers/BannerMessage'
import { useContext } from 'react'
import { UserIdContext } from 'providers/UserIdProvider'


export const useUserName = () => {
    const bannerContext = useContext(BannerMessageContext)
const { bannerDispatch } = bannerContext
const userContext = useContext(UserIdContext)
const { dispatch } = userContext
const fetchAndSetUserName = (userId: string) =>{
    const stateMaker = new StateMakerForUserName(userId)
    stateMaker.returnErrorAndUserName().then((data) => {
        if (data.userName !== '') {
            dispatch({ type: 'inputName', value: data.userName })
            bannerDispatch({type:"resetMessage"})
        }
        if (data.error !== '') {
            bannerDispatch({ type: 'setError', value: data.error })
        }
    })
}
return {fetchAndSetUserName}
    
}
