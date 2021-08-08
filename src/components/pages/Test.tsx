import { UIInfoReducer, initState } from 'reducers/UIInfo'
import { useReducer, useEffect } from 'react'
import { DisplayType, useGetHomeEventsLazyQuery } from 'types/generated/graphql'
export const Test = () => {
    const [uiInfoState, uiInfoStateDispatch] = useReducer(UIInfoReducer, initState)
    const [getHomeEvents, { data }] = useGetHomeEventsLazyQuery()
    useEffect(() => {
        getHomeEvents({ variables: { userId: '1' } })
    }, [])
    useEffect(() => {
        console.log('getHomeEventsData', data)
        uiInfoStateDispatch({ type: 'getHomeEvents', homeEvents: data?.getHomeEvents })
    }, [data])
    return (
        <>
            {uiInfoState.displayInfo.displayType === DisplayType.Newevent ? (
                <h3>this is New Event</h3>
            ) : (
                <h3>not new event</h3>
            )}
            {uiInfoState.displayInfo.event ? <h3>{uiInfoState.displayInfo.event.purpose}</h3> : null}
            <p></p>
        </>
    )
}
