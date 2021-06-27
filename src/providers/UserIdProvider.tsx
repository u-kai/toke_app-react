import React,{useState,createContext,VFC, ReactNode} from "react"

type Props = {
    children:ReactNode
}
type UserIdContextType = {
    userId:string
    setUserId:React.Dispatch<React.SetStateAction<string>>
}
export const UserIdContext = createContext<UserIdContextType>({} as UserIdContextType)
export const UserIdProvider:VFC<Props> = (props) =>{
    const {children} = props
    const [userId,setUserId] = useState("1")
    return(
        <UserIdContext.Provider value={{userId,setUserId}}>
            {children}
        </UserIdContext.Provider>
    )
} 