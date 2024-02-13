import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import CommentForm from "../../Components/CommentForm";
import ListComments from "../../Components/ListComments";
import Error from "../../Components/Error";
import axios from "axios";
import Layout from "../../Components/Layout";

function Post() {
    const isLoggedIn = localStorage.getItem('token') !== null;
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
        <Layout>
            <section className="py-5 container">
                <h1 className="post-title">{post.title}</h1>
                <p className="post-content">{post.content}</p>
            </section>

            <CommentForm postId={id} />
            <ListComments postId={id} />
        </Layout>
    );
}

export default Post;