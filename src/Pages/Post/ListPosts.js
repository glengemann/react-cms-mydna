import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import Error from '../../Components/Error';
import axios from 'axios';

function ListPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(0);

    useEffect(() => {
        const url = 'http://localhost:14000/api/posts';
        const token = localStorage.getItem('token');

        axios
            .get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                setPosts(response.data);
            })
            .catch((error) => {
                setError(true);
                setErrorCode(error.response?.status);
            });
    }, []);

    if (error) {
        return <Error status={errorCode}/>;
    }

    return (
        <>
            {posts.map((post) => (
                <div className="col" key={post.id}>
                    <PostCard key={post.id} post={post} title={post.title} content={post.content}/>
                </div>
            ))}
        </>
    );
}

export default ListPosts;