import axios from "axios";
import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./register.scss";

const Update = () => {

  
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const [email , setEmail] = useState('')
  const [image , setProP] = useState('')

  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext)

  const HandleRegiter =async (e) => {


    e.preventDefault()
    const formData = new FormData()

    formData.append('image' , image)
    formData.append('username' , username)
    formData.append('password' , password)
    formData.append('email' , email)
    

    await axios.put(`http://localhost:8800/api/users/${currentUser._id}` , formData)



    navigate('/')

  }



  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Gad Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
         
        </div>
        <div className="right">
          <form>
            <input    type="text"  name="username"  value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input    type="email"  name="email"  value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input    type="password"  name="password"  value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input    type="file"  name="image" onChange={(e) => setProP(e.target.files[0])} />
            <button onClick={HandleRegiter}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
