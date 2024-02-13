import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import Layout from "../../Components/Layout";

function CommentList() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:14000/api/comments')
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments', error);
            });
    }, []);

    return (
        <Layout>
            <h2>Comments</h2>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </Layout>
    );
}

export default CommentList;