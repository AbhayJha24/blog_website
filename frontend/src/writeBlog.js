import "./writeBlog.css";
import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function WriteBlog() {

    const title = useRef(null)
    const content = useRef(null)

    const [LoggedIn, setLoggedIn] = useState(null)
    const [name, setName] = useState(null)

    async function checksession() {
      const status = await fetch('http://13.233.5.58/sessioncheck', {
          method: 'post',
          mode:"cors",
          credentials: 'include',
          headers: {
            "Content-Type" : "application/json"
          }
        })

          if(status.status === 200){
              status.json().then(n => {
                  setName(n.name)
                })
          }

          return status
  }

    async function handlePost(e) {
        e.preventDefault();

    if(title.current.value === '' || content.current.value === ''){
        alert("Fill all the fields !")
    }

    else{
    const resp  = await fetch('http://13.233.5.58/writeBlog', {
      method: 'post',
      mode:"cors",
      credentials: 'include',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "title": title.current.value,
        "content": content.current.value
      })
    })

    if(resp.status === 401){
        alert("Unauthorized, Sign In first !")
    }

    else if(resp.status === 500){
        alert("Internal Server Error, try again later or contact website administrator !")
    }

    else if(resp.status === 200){
        alert("Blog post Successful !")
    }
  }
    }

    useEffect(() => {
      const status = checksession()
      status.then(r => {
        if(r.status === 200){
            setLoggedIn(true)
        } 
        
        else{
            setLoggedIn(false)
        }
      })
    }, [])
    

    if (LoggedIn === true) {

      return(
      <>
         <section className='section1'>
        <form action="" method="post" className="form">
        <div className="loginHeadings">
        <h1 className="loginformheading">Write Blog Post:</h1>
        </div>
          <div className='formusernamecontainer'>
          <label htmlFor="">Title :</label>
          <input type="text" name="" ref={title} placeholder='blog title' required />
          </div>
          
          <div className='formregisternamecontainer'>
          <label htmlFor="">Content :</label>
          <textarea ref={content} placeholder='blog content' required ></textarea>
          </div>
          
          <button className="loginButton" onClick={handlePost}>Post as {name ? name : "Guest"}</button>
        </form>
    </section>
        </>
         )
    }

    else if(LoggedIn === false){
      return (<Navigate to="/login" />)
    }
    
    return(<div></div>)
   
}

export default WriteBlog