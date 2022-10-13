
 import React  from 'react'
 import PropTypes from 'prop-types'
 import Add from '../image/user.png'
import { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

 
 const Login = () => {

  const [err,setErr]=useState(false);
  const navigate=useNavigate();

const submit= async(event)=>{
  event.preventDefault();
  
  
   const email=event.target[0].value;
  const password=event.target[1].value;
 

   

 try{ await signInWithEmailAndPassword(auth, email, password);

        navigate("/");
      
}

 catch(err){
 setErr(true); 
}};
   return (
     <div className='formContainer'>
        <div className='formWrapper'>
            <span className="logo">CHIT CHAT</span>
            <span className="title">Login</span>
            <form onSubmit={submit}>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder="password"/>
                
                <button  >sign in</button>
                {err && <span className='err'>Something went wrong</span>}
            </form>
            <p>you don't have an account ? <Link to="/register">Register</Link></p>

        </div>
     </div>
   )
 }
 
  
 
 export default Login