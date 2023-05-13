import { useRef } from "react";
import { Link } from "react-router-dom";
import './register.css'

function Register() {
    
    const uname = useRef(null);
    const email = useRef(null);
    const name = useRef(null);
    const pass = useRef(null);
    const repass = useRef(null);

  async function handleRegister(e) {

    e.preventDefault();

    if(pass.current.value !== repass.current.value){
        alert("Both passwords must match !")
    }

    else if(uname.current.value === '' || pass.current.value === '' || repass.current.value === '' || email.current.value === '' || name.current.value === ''){
        alert("Fill all the fields !")
    }

    else{
    const resp  = await fetch('http://13.233.5.58/register', {
      method: 'post',
      mode:"cors",
      credentials: 'include',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "username": uname.current.value,
        "password": pass.current.value,
        "name": name.current.value,
        "email": email.current.value
      })
    })
    if(resp.status === 400){
        alert("User with the same email or username already exists !")
    }

    else if(resp.status === 500){
        alert("Internal Server Error, try again later or contact website administrator !")
    }

    else if(resp.status === 200){
        alert("Registration Successful, now you can Log In !")
    }
  }
}

  return (
    <section className='section1'>
        <form action="" method="post" className="form">
        <div className="loginHeadings">
        <h1 className="loginformheading">Register:</h1>
        </div>
          <div className='formusernamecontainer'>
          <label htmlFor="">Username :</label>
          <input type="text" name="" ref={uname} placeholder='your username' required />
          </div>
          
          <div className='formregisternamecontainer'>
          <label htmlFor="">Name :</label>
          <input type="text" name="" ref={name} placeholder='your name' required />
          </div>
          
          <div className='formregisteremailcontainer'>
          <label htmlFor="">Email :</label>
          <input type="text" name="" ref={email} placeholder='your email' required />
          </div>

          <div className='formpasswordcontainer'>
          <label htmlFor="">New Password :</label>
          <input type="password" name="" ref={pass} placeholder='your password' required />
          </div>
          
          <div className='formpasswordcontainer'>
          <label htmlFor="">Repeat Password :</label>
          <input type="password" name="" ref={repass} placeholder='enter password again' required />
          </div>
          <button className="loginButton" onClick={handleRegister}>Register</button>
          <Link to={`/login`} className="loginLink">Existing User ? Login Here</Link>
        </form>
    </section>
  );
}

export default Register