import './login.css';
import { useRef } from 'react';
import axios from 'axios';

function Login() {

  const uname = useRef(null);
  const pass = useRef(null);

  async function handleLogin(e) {

    e.preventDefault();
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

    console.log(resp.json().then().then(d => console.log(d)).catch(e => console.log(e)));
  }

  return (
    <section className='section1'>

      <div className="loginHeadings">
        <h1 className="loginformheading">Login:</h1>
      </div>

      <div>
        <form action="" method="post" className="form">
          <div className='formusernamecontainer'>
          <label htmlFor="">Username :</label>
          <input type="text" name="" ref={uname} placeholder='your username'/>
          </div>

          <div className='formpasswordcontainer'>
          <label htmlFor="">Password :</label>
          <input type="password" name="" ref={pass} placeholder='your password' />
          </div>
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
