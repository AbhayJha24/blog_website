import "./writeBlog.css";
import { useRef } from "react";

function WriteBlog() {

    const title = useRef(null)
    const content = useRef(null)

    async function handlePost(e) {
        e.preventDefault();

    if(title.current.value === '' || content.current.value === ''){
        alert("Fill all the fields !")
    }

    else{
    const resp  = await fetch('http://localhost/writeBlog', {
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
          
          <button className="loginButton" onClick={handlePost}>Post</button>
        </form>
    </section>
        </>
    )
}

export default WriteBlog