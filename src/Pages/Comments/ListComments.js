import React, {useEffect, useState, createContext } from 'react';
import Comment from './Comment';
import axios from "axios";

export const CommentContext = createContext();

function ListComments({ postId }) {
    const [comments, setComments] = useState([]);
    const url = `http://localhost:14000/api/posts/${postId}/comments`;

    const removeComment = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    }
    
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments', error);
            });
    }, []);

    if (comments === undefined || comments.length === 0) {
        return <section className="py-5 container">No comments yet</section>;
    }

    return (
        <CommentContext.Provider value={{ removeComment }}>
            <section className="py-5 container">
                <h4>Comments</h4>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
            </section>
        </CommentContext.Provider>
    );
}

export default ListComments;