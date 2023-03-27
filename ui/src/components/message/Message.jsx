import axios from 'axios';
import { useEffect, useState } from 'react';
import './Message.scss'
import {format} from 'timeago.js'

function Message({own , mes , currentUser , currentchat}) {


  const [img , setImg] = useState('')



  useEffect(() => {
    const id = currentchat.members.find(e => e !== currentUser._id)

    async function aha() {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}`);

        setImg(res.data.others.image)

      } catch (error) {
        console.log(error);
      }
    }

    aha();
  }, [currentUser , currentchat]);


  return (
    <>
    <div className={own ? "message own" :'message'}>
        
        <img src={mes.sender === currentUser._id ? currentUser.image: img} alt="" />
        <span>{mes.text}</span>
    </div>
    <p style={{fontSize:'12px' , color:"gray" , marginBottom:"20px"}} >{format(mes.createdAt)}</p>

    </>
  )
}

export default Message