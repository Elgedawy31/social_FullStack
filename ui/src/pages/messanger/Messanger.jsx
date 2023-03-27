import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Convegration from "../../components/convegrations/Convegration";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/onlineChat/ChatOnline";
import { AuthContext } from "../../context/authContext";
import "./Messanger.scss";
export const Messanger = () => {


  const ScrollRef = useRef()


  const [textMessage , settextMessage] = useState('')

  const [conv, setConve] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [message, setMessage] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {



    async function aha() {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/conversation/${currentUser._id}`
        );

        setConve(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    aha();
  }, [currentUser]);



  useEffect(() => {

    const getMessages = async () => {

      const MessagesData = await axios.get(`http://localhost:8800/api/message/${currentchat?._id}`)

      setMessage(MessagesData.data)

    }

    getMessages()

  } , [currentchat])



  const messageHandle = async (e) =>{

    e.preventDefault()

    const data = {
      text: textMessage ,
      sender:currentUser._id ,
      conId : currentchat?._id
    }

    try {



      const res = await axios.post('http://localhost:8800/api/message' , data)

      setMessage([...message , res.data])

      
    } catch (error) {
      
      console.log(error)
    }
    
    
  }
  

  useEffect(() => {

    ScrollRef.current?.scrollIntoView({ behavior:'smooth' })

  } , [message])

  return (
    <>
      <div className="messanger">
        <div className="chatmenu">
          <div className="chatwrapper">
            <input type="text" placeholder="Search for friends" />

            {conv.map((e) => {
              return (
                <div onClick={() => setcurrentchat(e)} key={e._id}>
                  <Convegration friend={e} user={currentUser} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatbox">
          {currentchat ? (
            <div className="chatwrapper">
              <div className="top">
               {
                  message.map(e=> {

                    return                <div ref={ScrollRef}>

{
                  message.map(e=> {

                    return <Message key={e._id}  own={e.sender === currentUser._id ? 'own' : ''} mes={e} currentUser={currentUser}  currentchat={currentchat} />

                  })
                }

                    </div>

                  })
                }

              </div>

              <div className="bottom">
                <textarea placeholder="write your message" onChange={(e) => settextMessage(e.target.value)}></textarea>
                <button style={{cursor:'pointer'}} onClick={messageHandle}>Send</button>
              </div>
            </div>
          ) : (
            "No Chats"
          )}
        </div>
        <div className="chatonline">
          <div className="chatwrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};
