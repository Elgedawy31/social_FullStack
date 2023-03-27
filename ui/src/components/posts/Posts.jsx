import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { dataContext } from "../../context/fetchData";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {


  const { response , GetData } = useContext(dataContext);
  const { currentUser } = useContext(AuthContext);


  GetData(`http://localhost:8800/api/post/timeline/${currentUser._id}`)

  return <div className="posts">
    {response.map(post=>(
      <Post post={post} key={post._id}/>
    ))}
  </div>;
};

export default Posts;
