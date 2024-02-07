import React from 'react';

function Comment({ comment }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Karl Popper</h5>
                <p className="card-text">{comment.content}</p>
                <small>{comment.created_at}</small>
            </div>
        </div>
    );
}

export default Comment;