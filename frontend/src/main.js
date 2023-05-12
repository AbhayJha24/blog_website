import "./main.css"
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function Main() {

    const [LoggedIn, setLoggedIn] = useState(null)
    const [name, setName] = useState(null)
    const [blogs, setBlogs] = useState([])

    async function checksession() {
        const status = await fetch('http://localhost/sessioncheck', {
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

    async function fetchBlogs() {
        const blogs = fetch('http://localhost/blogs', {
            method: 'get',
            mode:"cors",
          })
          blogs.then().then(r => r.json().then(d => {
            setBlogs(d)
          }))
    }

    useEffect(() =>{
          fetchBlogs()
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
    
            
               {blogs.map(blog => {
                    return(
                        <Link className="blogPost" to={`/blog/${blog._id}`}>
                            <h1 className="blogTitle">{blog.title}</h1>
                            <h2 className="blogAuthor">{`By ${blog.author}`}</h2>
                            <p>{blog.content}</p>
                        </Link>
                    )
                    
               })
            }
            </section>
            </div>
            </>
        )
    }
    else if(LoggedIn === false){
        /*Route to login page */
        return (<Navigate to="/login" />)
    }
    return(<div></div>)
}

export default Main;