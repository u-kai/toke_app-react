import React, { useState } from 'react'
import socketIOClient from 'socket.io-client'

export const SocketIo = () => {
    // const [socket,setSocket] = useState(socketIOClient("http://localhost:8080"))
    const [name, setName] = useState('')
    // const socketSetName = () => {
    //     if(socket !== undefined){
    //         socket.emit("setName",name)
    //     }
    //     setSocket(socket)
    // }
    // socket.on("chat message",(data:string)=>{
    //     console.log(data)
    // })

    return (
        <div>
            <input onChange={(e) => setName(e.target.value)} />
            {/* <button onClick={socketSetName}>send</button> */}
        </div>
    )
}
