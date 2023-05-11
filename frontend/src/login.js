import './login.css';
import { useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Login() {

  const uname = useRef(null);
  const pass = useRef(null);

  async function handleLogin(e) {

    e.preventDefault();

    if(uname.current.value === '' || pass.current.value === ''){
      alert("Fill all the fields !")
  }

  else{
    const resp  = await fetch('http://localhost/loginrequest', {
      method: 'post',
      mode:"cors",
      credentials: 'include',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "username": uname.current.value,
        "password": pass.current.value
      })
    })

    if(resp.status === 400){
      alert("User with the username not found, please register first !")
    }

    else if(resp.status === 401){
      alert("Wrong Password !")
    }

    else if(resp.status === 500){
        alert("Internal Server Error, try again later or contact website administrator !")
    }

    else if(resp.status === 200){
        alert("Log In, Successful !")
    }
  }
}

  return (
    <section className='section1'>
      <div>
        <form action="" method="post" className="form">
        <div className="loginHeadings">
        <h1 className="loginformheading">Login:</h1>
        </div>
          <div className='formusernamecontainer'>
          <label htmlFor="">Username :</label>
          <input type="text" name="" ref={uname} placeholder='your username' required />
          </div>

          <div className='formpasswordcontainer'>
          <label htmlFor="">Password :</label>
          <input type="password" name="" ref={pass} placeholder='your password' required />
          </div>
          <button className="loginButton" onClick={handleLogin}>Login</button>
         <Link to={`/register`} className="registerLink">New User ? Register Here</Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
