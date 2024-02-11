import React, {useState} from 'react';
import axios from 'axios';

function CommentForm({postId}) {
    const [comment, setComment] = useState('');
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:14000/api/comments/', {
                    content: comment,
                    post_id: postId
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                }
            );

            if (response.status === 201) {
                setComment('');
                alert('Comment submitted successfully');
            } else {
                alert('Error submitting comment');
            }
        } catch (error) {
            console.error('Error submitting comment', error);
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
                <button type="submit"
                    className="btn btn-primary"
                    disabled={!isLoggedIn}
                >
                    Submit
                </button>
            </form>
            {!isLoggedIn && (
                <div className="alert alert-warning" role="alert">
                    You must be logged in to comment.
                </div>
            )}
        </div>
    );
}

export default CommentForm;