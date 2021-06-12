import React, { useState } from 'react'
import styled from 'styled-components'
import { CardContainer } from 'components/atoms/CardContainer'

export const GroupCard = () => {
    return (
        <CardContainer>
            <div>
                所属グループ一覧
                <span>
                    <button>＋</button>
                </span>
            </div>
            <div>
                <a href="#">チーム5丁目</a>
            </div>
            <div>
                <a href="#">チーム基幹職</a>
            </div>
        </CardContainer>
    )
}

const TeamName = styled.p``
