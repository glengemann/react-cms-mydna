import React from 'react';
import Comment from './Comment';

function ListComments({ comments }) {
    if (!comments) {
        return <div>No comments yet</div>;
    }

    return (
        <div>
            <h4>Comments</h4>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default ListComments;