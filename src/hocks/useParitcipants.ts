import { useState, useContext } from 'react'
import { StateMakerForGetParticipants } from 'model/StateMaker/StateMakerForGetParticipants'
import { BannerMessageContext } from 'providers/BannerMessage'
export const useParticipants = () => {
    const bannerContext = useContext(BannerMessageContext)
    const { bannerDispatch } = bannerContext
    const [participants, setPaticipants] = useState(['0人'])
    const getPariticipants = (attendanceRequestId: string) => {
        const stateMaker = new StateMakerForGetParticipants(attendanceRequestId)
        stateMaker.returnErrorAndParticipants().then((data) => {
            if (data.error !== '') {
                bannerDispatch({ type: 'setError', message: data.error })
            }
            if (data.error === '') {
                setPaticipants(data.participants)
                bannerDispatch({ type: 'resetMessage' })
            }
        })
    }
    return { participants, getPariticipants }
}
