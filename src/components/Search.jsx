 import React, { useState,useContext } from 'react'
 import { collection, query, where,getDocs, setDoc ,doc, updateDoc, serverTimestamp, getDoc} from "firebase/firestore";
 import {db} from "../firebase"
import userEvent from '@testing-library/user-event';
import { AuthContext } from "../context/AuthContext";
 
 const Search = () => {

  const [Username,setUsername]=useState("")
  const [User,setUser]=useState(null)
  const [err,setErr]=useState(false)
  const {currentUser}=useContext(AuthContext);

const handleSearch= async()=>{
 const q=query(collection(db,"users"),
 where("displayName","==",Username));
 try{
   const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    setUser(doc.data())
});
}
catch(err){
  setErr(true)
}
};

  const handleKey=(e)=>
{
  e.code ==="Enter" && handleSearch();
}
const handleSelect = async()=>{

  const combinedId=currentUser.uid > User.uid ? currentUser.uid + User.uid : User.uid + currentUser.uid;
  try{
 const res = await getDoc(doc(db,"chats",combinedId));
    //NO chat between user create exist

    if(!res.exists()){
      await setDoc(doc(db,"chats",combinedId),{messages:[]});

      //create user chats
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId+".userInfo"]:{
          uid: User.uid,
          displayName: User.displayName,
          photoURL: User.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });
      await updateDoc(doc(db,"userChats",User.uid),{
        [combinedId+".userInfo"]:{
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId+".date"]: serverTimestamp()
      });
    }
}
catch(err){
  setErr(true);
}

setUser(null);
setUsername(" "); 
};

   return (
     <div className='search'>
      <div className="searchForm">
        <input  type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={Username} /></div>
        {err && <span>User not found!</span> }
        <div  > 
      {User && <div className="userChat" onClick={handleSelect}>
        <img src={User.photoURL}  />
        <div className="userChatInfo">
        <span>{User.displayName}</span>
      </div>
      </div>}
      </div>
      
       
     </div>
   )
 }
 
 export default Search