import "./main.css"
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

function Main() {

    const [LoggedIn, setLoggedIn] = useState(false)

    async function checksession() {
        const status = await fetch('http://localhost/sessioncheck', {
            method: 'post',
            mode:"cors",
            credentials: 'include',
            headers: {
              "Content-Type" : "application/json"
            }
          })
          return status
    }

    useEffect(() =>{
          const status = checksession()
          console.log(status.then().then(d => {if(d.status === 200){setLoggedIn(true)} else{setLoggedIn(false)}}).catch(e => console.log(e)))
        //   status.json().then().then(d => console.log(d)).catch(e => console.log(e));
    }, [LoggedIn])

    if(LoggedIn === true){
        return(
            <div>
            <div className="mainHeading">
                <h1 className="mainPageHeading">Blogs</h1>
            </div>
    
            <section className="blogsContainer">
                <div className="blogPost">
                    <h1 className="blogTitle">Blog Post Name</h1>
                    <h2 className="blogAuthor">By Author Name</h2>
                    <p>Dynamically Fetched blog post</p>
                </div>
                <div className="blogPost">
                    <h1 className="blogTitle">Blog Post Name</h1>
                    <h2 className="blogAuthor">By Author Name</h2>
                    <p>Dynamically Fetched blog post</p>
                </div>
                <div className="blogPost">
                    <h1 className="blogTitle">Blog Post Name</h1>
                    <h2 className="blogAuthor">By Author Name</h2>
                    <p>Dynamically Fetched blog post</p>
                </div>
                <div className="blogPost">
                    <h1 className="blogTitle">Blog Post Name</h1>
                    <h2 className="blogAuthor">By Author Name</h2>
                    <p>Dynamically Fetched blog post</p>
                </div>
            </section>
            </div>
        )
    }
    else if(LoggedIn === false){
        /*Route to login page */
        console.log("Reached here")
        redirect("/login");
    }
    return(<div></div>)
}

export default Main;