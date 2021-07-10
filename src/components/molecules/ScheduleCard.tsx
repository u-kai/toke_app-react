import styled from 'styled-components'
import React, { VFC } from 'react'
import { DateConverter } from 'model/DateConverter'
import { CardContainer } from 'components/atoms/CardContainer'
import { ScheduleCardProps } from 'types/ui-types/ScheduleCardProps'

const dateConverter = new DateConverter()
export const ScheduleCard: VFC<ScheduleCardProps> = React.memo((props) => {
    const today = dateConverter.displayToday()
    return (
        <CardContainer>
            {props.isDate ? <Dates>{today}</Dates> : null}
            <Title>{props.title}</Title>
            <ScheduleContainer>
                <SUl>
                    {props.schedules.map((schedule, i) => (
                        <>
                            <Sli>
                                <a href={props.scheduleUrl[i]}>{schedule}</a>
                            </Sli>
                            <div>
                                <LiChildren>時間:{props.scheduleDates[i]}</LiChildren>
                            </div>
                            <div>
                                <LiChildren>場所:{props.scheduleLocations[i]}</LiChildren>
                            </div>
                        </>
                    ))}
                </SUl>
            </ScheduleContainer>
        </CardContainer>
    )
})

const Dates = styled.div`
    font-size: 16px;
    margin: 5px;
`

const Title = styled.h2`
    margin-top: -5px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
`

const Sli = styled.li`
    font-size: 16px;
    margin-left: -10px;
    margin-top: 10px;
`
const SUl = styled.ul`
    margin-top: -5px;
`
const ScheduleContainer = styled.div`
    position: absolute;
    top: 60px;
    height: 220px;
    width: 100%;
    overflow: auto;
`
const LiChildren = styled.span`
    font-size: 12px;
`
