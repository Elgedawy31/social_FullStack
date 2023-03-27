import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Share = () => {

  const [desc , setUsername] =useState('')
  const [image , setImage] =useState('')
  
  const {currentUser} = useContext(AuthContext)



  const  ShareFunction =async (e) => {

    e.preventDefault()
    
    const formData = new FormData();
    formData.append('desc' , desc)
    formData.append('image' , image)

     await axios.post(`http://localhost:8800/api/post/${currentUser._id}` , formData)
    
    window.location.reload()
  }



  return (
    <div className="share">
      <div className="container">
          <form onSubmit={ShareFunction} >
        <div className="top">
          <img
            src={currentUser.image}
            alt=""
          />
        <input type="text" name="desc" placeholder={`What's on your mind ${currentUser.username}?`} value={desc} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file"  name="image" style={{display:"none"}} onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item" >
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button >Share</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
