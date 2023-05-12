import "./blog.css";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function Blog() {

    const blogId = useParams()

    const [blog, setBlog] = useState({})
    const [name, setName] = useState(null)
    const comment = useRef(null)

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
    }

    async function fetchBlog(id) {
        const blogs = fetch(`http://localhost/blogs?id=${id}`, {
            method: 'get',
            mode:"cors",
          })
          blogs.then().then(r => r.json().then(d => {
            setBlog(d)
          }))
    }

    useEffect(() => {
        fetchBlog(blogId.id)
        checksession()
    }, [])

    async function handleComment(e) {

        e.preventDefault();

        if(comment.current.value === ''){
            alert("Write a comment !")
        }

        else{
            const commented = fetch('http://localhost/comment', {
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

    return(
        <>
        <section className="blogPage1">
            <div className="blogFullPost" to={`/blog/${blog._id}`}>
                <h1 className="blogTitle">{blog.title}</h1>
                <h2 className="blogAuthor">{`By ${blog.author}`}</h2>
                <p className="blogContent">{blog.content}</p>
            </div>
        </section>
        <section className="commentsSection">
        <form className="comments">
                <div className="loginHeadings">
                <h1 className="commentformheading">Comment:</h1>
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

export default Blog