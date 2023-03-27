import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import img1 from '../../assets/1.png'
import axios from "axios";
import {format} from 'timeago.js'
import { AuthContext } from "../../context/authContext";




const Post = ({ post }) => {


  const {currentUser} = useContext(AuthContext)

  const [commentOpen, setCommentOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const [liked , setLiked] = useState(false)
  const [dele , setDele] = useState(false)


useEffect(() => {
  setLiked( post.likes ?post.likes.includes(currentUser._id) : 1)
} , [post , currentUser])
  
  useEffect(() => {
    // console.log(post._id)

    const data = async () => {

      const myData = await axios.get(`http://localhost:8800/api/users/${post.userId}`)

      setUserData(myData.data.others)

    }

    data()
    

    
  } , [post])
  
  const likeHandler =async (e) => {

    
    try {

    axios.put(`http://localhost:8800/api/post/like/${post._id}` , {userId :currentUser._id})

    setLiked(!liked)
    
    
  } catch (error) {
    console.log(error)
  }
  
   
  }



  const deleteHandler =async () => {

    
    // console.log(post._id)
    // console.log(currentUser._id)
    await axios.delete(`http://localhost:8800/api/post/${post._id}` , {data : {userId: currentUser._id}})

    window.location.reload()
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={userData.image ||img1} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{userData.username}</span>
              </Link>
              <span className="date">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="options"  >
          <MoreHorizIcon onClick ={() => setDele(!dele)} style={{cursor:'pointer'}} />
                  
                  <div style={{cursor:'pointer'}}  onClick={deleteHandler}>{dele && 'delete Post'  }</div>
              

          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.image} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={likeHandler}>
            { liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {post.likes ? post.likes.length : 0} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
