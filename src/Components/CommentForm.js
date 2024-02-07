import React, {useState} from 'react';

function CommentForm({postId}) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:14000/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: comment, post_id: postId}),
        });

        const data = await response.json();

        if (response.status === 201) {
            setComment('');
            alert('Comment submitted successfully');
        } else {
            alert('Error submitting comment');
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="form-group">
                    <label>
                        Comment:
                        <textarea
                            className="form-control"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CommentForm;