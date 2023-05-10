import './login.css';

function handleLogin(e) {
  alert("Logged In !");
  e.preventDefault();
}

function Login() {
  return (
    <section className='section1'>

      <div className="loginHeadings">
        <h1 className="loginformheading">Login:</h1>
      </div>

      <div>
        <form action="" method="post" className="form">
          <div className='formusernamecontainer'>
          <label htmlFor="">Username :</label>
          <input type="text" name="" id="" placeholder='your username'/>
          </div>

          <div className='formpasswordcontainer'>
          <label htmlFor="">Password :</label>
          <input type="password" name="" id="" placeholder='your password' />
          </div>
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
