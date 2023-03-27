import { useContext, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  
  const navigate = useNavigate()

  const [username , setUsername] = useState(null)
  const [password , setPassword] = useState(null)
  const [errorHandling , seterrorHandling] = useState(null)

  const { login , currentUser } = useContext(AuthContext);

  
  const handleLogin = (e) => {
    
    
    e.preventDefault()
    
    const fu = () => {
      const data = {
        username , password
      }
  
      login('http://localhost:8800/api/auth/login' , data);
      
    }

    fu()

   !currentUser &&  seterrorHandling('this email or password not valid')
    

  };
  
  

  
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </form>

          {/* {currentUser === null && 'change this email or username'} */}

          {errorHandling}

          {currentUser !== null && <button  onClick={() => navigate('/')}>TO HOME</button>}
        </div>
      </div>
    </div>
  );
};

export default Login;
