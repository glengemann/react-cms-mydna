import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import CommentForm from "./CommentForm";
import ListComments from "./ListComments";
import Error from "./Error";

function Post() {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const url = `http://localhost:14000/api/posts/${id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPost(data);
            })
            .catch(() => {
                setError(true);
            })
    }, [id]);

    if (error) {
        return <Error />;
    }

    return (
        <div className="">
            <div className="container">
                <header className="d-flex justify-content-center py-3">
                    <ul className="nav nav-pills">
                        <Link to="/" className="nav-item nav-link">Home</Link>
                    </ul>
                </header>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                    </div>
                </div>
                <CommentForm postId={id}/>
                <ListComments comments={post.comments}/>
            </div>
        </div>
    );
}

export default Post;