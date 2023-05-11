import "./main.css"
import { useEffect, useState } from "react";
import { redirect, Link } from "react-router-dom";

function Main() {

    const [LoggedIn, setLoggedIn] = useState(null)
    const [name, setName] = useState(null)

    async function checksession() {
        const status = await fetch('http://localhost/sessioncheck', {
            method: 'post',
            mode:"cors",
            credentials: 'include',
            headers: {
              "Content-Type" : "application/json"
            }
          })
          status.json().then(n => {
            setName(n.name)
          })
          return status
    }

    async function fetchBlogs() {
        const blogs = fetch('http://localhost/blogs', {
            method: 'get',
            mode:"cors",
          })
          blogs.then(r => console.log(r))
    }

    useEffect(() =>{
        //   console.log(fetchBlogs())
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

    if(LoggedIn === true){
        return(
            <>
            <nav>
                <li className="navBarItem">Hello {name ? name : "Guest"}</li>
                <Link to={`/writeblogs`} className="navBarItem">Write a Blog</Link>
            </nav>
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
            </>
        )
    }
    else if(LoggedIn === false){
        /*Route to login page */
        redirect("/login");
    }
    return(<div></div>)
}

export default Main;