import React, {useState} from 'react';
import axios from 'axios';

function CommentForm({postId}) {
    const [comment, setComment] = useState('');
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:14000/api/comments/', {
                    content: comment,
                    post_id: postId
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                }
            ).then((response) => {
                setComment('');
                alert('Comment submitted successfully');
            }).catch((error) => {
                alert('Error submitting comment');
                setErrorMessage(error.message + ': ' + error.response.data.message);
            });
    };

    return (
        <div className="container-fluid">
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            {!isLoggedIn && (
                <div className="alert alert-warning" role="alert">
                    You must be logged in to comment.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >Comment</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        required
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isLoggedIn}
                >Submit</button>
            </form>
        </div>
    );
}

export default CommentForm;