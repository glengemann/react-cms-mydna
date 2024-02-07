import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
import Error from './Error';

function ListPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:14000/api/posts';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    const renderList = () => {
        if (error) {
            return <Error />;
        }

        return posts.map((post) => {
            return (
                <PostItem key={post.id} post={post} title={post.title} content={post.content}/>
            );
        });
    };

    return (
        <div className='row'>
            {renderList()}
        </div>
    );
}

export default ListPosts;