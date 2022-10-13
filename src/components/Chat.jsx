import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
 

const Chat = () => {

  const {data}=useContext(ChatContext)
  return (
    <div className='Chat'>
      <div className="chatInfo">
        <span style={{padding:"20px"}}>{data.user?.displayName}
        </span>
        <div style={{padding:"20px"}} className="chatIcons">

          <img style={{height:"35px"}}src='https://cdn1.iconfinder.com/data/icons/action-states-vol-4-1/48/Sed-18-512.png' alt=""/>
          <img style={{height:"30px"}} src='https://cdn0.iconfinder.com/data/icons/ui-kit-elements/16/Kabab_Menu-256.png' alt=""/>
        
          

        </div>
      </div>
      <Messages/>
      <Input/>

    </div>
  )
}

export default Chat