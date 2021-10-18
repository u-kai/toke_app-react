import { createContext, useState } from 'react'
import { UserInfo } from 'types/generated/graphql'
import { ChildrenProps } from 'types/ui-types/ChildrenProps'

export type AllUserContextType = {
    allUser: UserInfo[]
    setAllUser: React.Dispatch<React.SetStateAction<UserInfo[]>>
}

export const AllUserContext = createContext<AllUserContextType>({} as AllUserContextType)

export const AllUserProvider: React.VFC<ChildrenProps> = (props) => {
    const { children } = props
    const [allUser, setAllUser] = useState<UserInfo[]>([])
    return <AllUserContext.Provider value={{ allUser, setAllUser }}>{children}</AllUserContext.Provider>
}
