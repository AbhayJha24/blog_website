import "./main.css"

function Main() {
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

export default Main;