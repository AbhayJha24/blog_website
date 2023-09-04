import "./blog.css";
import { useState, useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

function Blog() {

    const blogId = useParams()

    const [blog, setBlog] = useState({})
    const  [comments, setComments] = useState([])
    const [name, setName] = useState(null)
    const comment = useRef(null)
    const [LoggedIn, setLoggedIn] = useState(null)

    async function checksession() {
        const status = await fetch('https://blog-website-jet.vercel.app/sessioncheck', {
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

    async function fetchBlog(id) {
        const blogs = fetch(`https://blog-website-jet.vercel.app/blogs?id=${id}`, {
            method: 'get',
            mode:"cors",
          })
          blogs.then().then(r => r.json().then(d => {
            setBlog(d)
          }))
    }

    
    async function fetchComments(id) {
        const comments = fetch(`https://blog-website-jet.vercel.app/comments?id=${id}`, {
            method: 'get',
            mode:"cors",
          })
          comments.then().then(r => r.json().then(d => {
            setComments(d)
          }))
    }
   

    useEffect(() => {
        fetchBlog(blogId.id)
        fetchComments(blogId.id)
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

    async function handleComment(e) {

        e.preventDefault();

        if(comment.current.value === ''){
            alert("Write a comment !")
        }

        else{
            const commented = fetch('https://blog-website-jet.vercel.app/comment', {
                method: 'post',
                mode:"cors",
                credentials: 'include',
                headers: {
                "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "id": blogId.id,
                    "content": comment.current.value
                })
            })

            commented.then(resp => {
                if(resp.status === 401){
                    alert("Unauthorized, Sign In first !")
                }
            
                else if(resp.status === 500){
                    alert("Internal Server Error, try again later or contact website administrator !")
                }
            
                else if(resp.status === 200){
                    alert("Comment posted Successfully !")
                }
            })
        }
    }

    if (LoggedIn === true) {
        return(
            <>
            <nav>
                    <li className="navBarItem">Hello {name ? name : "Guest"}</li>
                    <Link to={`/writeblogs`} className="navBarItem">Write a Blog</Link>
                </nav>
            <section className="blogPage1">
                <div className="blogFullPost" to={`/blog/${blog._id}`}>
                    <h1 className="blogTitle">{blog.title}</h1>
                    <h2 className="blogAuthor">{`By ${blog.author}`}</h2>
                    <p className="blogContent">{blog.content}</p>
                </div>
            </section>
            <section className="commentsHolder">
                <h2 className="commentsHeading">Comments</h2>
                {
                    comments.map(comment => {
                        return(
                            <p className="commentText">{comment.commentText} <sub> {comment.username}</sub></p>
                        )
                    })
                }
            </section>
            <section className="commentsSection">
            <form className="comments">
                    <div className="loginHeadings">
                    <h1 className="commentformheading">Add Comment:</h1>
                    </div>
                    <div className='formusernamecontainer'>
                    <input type="text" name="" ref={comment} placeholder='your comment' required />
                    </div>
                    <button className="loginButton" onClick={handleComment}>{`Comment as ${name ? name: "Guest"}`}</button>
                </form>
            </section>
            </>
        )
    }
    else if(LoggedIn === false){
        return (<Navigate to="/login" />)
    }

    return (<div></div>)
}

export default Blog