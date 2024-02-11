import React from 'react';
import Comment from './Comment';

function ListComments({ comments }) {
    if (!comments) {
        return <div>No comments yet</div>;
    }

    return (
        <section className="py-5 container">
            <h4>Comments</h4>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </section>
    );
}

export default ListComments;