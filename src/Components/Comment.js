import React from 'react';
import axios from 'axios';
import moment from "moment/moment";

function Comment({comment}) {
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const commentId = comment.id;

    const handleEdit = () => {

    };

    const handleDelete = () => {
        axios
            .delete(`http://localhost:14000/api/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                alert('Comment deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting comment', error);
                alert('Error deleting comment');
            });
    };

    const handleApprove = () => {
        const status = comment.status === 'approved' ? 'rejected' : 'approved';
        axios
            .patch(`http://localhost:14000/api/comments/${commentId}/status/${status}`, {
                status: 'approved'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                alert('Comment status updated successfully');
            })
            .catch((error) => {
                alert('Error updating comment status');
                console.error('Error updating comment status', error);
            });
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Karl Popper</h5>
                <p className="card-text">{comment.content}</p>
                <small className="text-body-secondary">
                    {moment(comment.created_at).fromNow()}
                </small>

                {isLoggedIn && (
                    <div className="text-end">
                        <button onClick={handleEdit} className="btn btn-primary m-1" disabled={true}>
                            Edit
                        </button>
                        <button onClick={handleDelete} className="btn btn-danger m-1">
                            Delete
                        </button>
                        <button onClick={handleApprove} className="btn btn-success m-1">
                            {comment.status === 'approved' ? 'Disapprove' : 'Approve'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;