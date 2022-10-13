import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {

const {currentUser}=useContext(AuthContext);
return (

    <div className='navbar'>
      <span className="logo">CHIT CHAT</span>
      <div className="user">
        <img  src={currentUser.photoURL}  className="pro"/>
        <span className='name'>{currentUser.displayName}</span>
        <button style={{display:"none"}} onClick={()=>signOut(auth)} id="logout"></button>
        <label className='logout' htmlFor='logout'>
        <img src="https://img.icons8.com/ultraviolet/40/000000/shutdown--v1.png"/>
        </label>
        
      </div>
    </div>
  )
}

export default Navbar