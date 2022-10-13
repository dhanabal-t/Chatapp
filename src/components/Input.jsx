import { async } from '@firebase/util';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Await } from 'react-router-dom';

const Input = () => {
  const [text,setText]=useState(" ")
  const [img,setImg]=useState(null)

  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);

const handleSend= async()=>{
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef,img);
      uploadTask.on( 
     (error)=>{
      //setErr(ture);
     },
         
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages:arrayUnion({
                id:uuid(),
                senderId:currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          
          });
        }
      );
    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date: Timestamp.now(),
        })
      })
      setText("")
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    })
    
    setImg(null)
}

  return (
    <div className='input'> 
    <input type="text" placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text}/>
    <div className="send">
      <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])} />
      <label htmlFor='file'>
        <img style={{height:"40px"}}src="data:image/png;base64,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" alt="" />
      </label>
      <button onClick={handleSend} style={{display:"none"}}id="send"></button>
      <label htmlFor='send'>
      <img src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-send-email-interface-anggara-flat-anggara-putra.png"/>
      </label>
    </div>
    
    </div>
  )
}

export default Input