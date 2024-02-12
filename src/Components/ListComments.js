import React from 'react';
import Comment from './Comment';

function ListComments({ comments }) {
    if (comments === undefined || comments.length === 0) {
        return <section className="py-5 container">No comments yet</section>;
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