import React from "react"
import {gql } from "graphql-tag"
import { useNewRegistUserMutation } from "types/generated/graphql"

const query = gql`
mutation newRegistUser($userName:String,$password:String){
    newRegistUser(userName:$userName,password:$password){
        
            success
            error
        




    }
}
`

export const  GraphUserReg = () => {
    const [userName,setUserName] = React.useState("")
   const [password,setPassword] = React.useState("") 
    const [newRegistUser] = useNewRegistUserMutation(
        {variables:{
            userName:userName,
            password:password
        }}
    )
    const handler = async() => {
        await newRegistUser()
    }
    return(<>
    <input value={userName} onChange={(e)=>setUserName(e.target.value)}/>
    <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <button onClick={handler} >btn</button>
    </>)
}