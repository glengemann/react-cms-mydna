import React, {useState} from 'react';
import axios from 'axios';
import moment from "moment/moment";

function Comment({comment: initialComment}) {
    const [comment, setComment] = useState(initialComment);
    const token = localStorage.getItem('token');
    const commentId = comment.id;

    const handleApprove = () => {
        const status = comment.status === 'approved' ? 'rejected' : 'approved';
        const url = `http://localhost:14000/api/comments/${commentId}/status/${status}`;
        axios
            .patch(url, { }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                alert('Comment status updated successfully');
                setComment(response.data);
            })
            .catch((error) => {
                alert('Error updating comment status');
                console.error('Error updating comment status', error);
            });
    };

    const getBadgeClass = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-success';
            case 'rejected':
                return 'bg-danger';
            default:
                return 'bg-warning';
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">The user "{ comment.user_id }" commented the post #{ comment.post_id }</h5>
                <p className="card-text">
                    {comment.content}
                </p>
                <small className="text-body-secondary">
                    {moment(comment.created_at).fromNow()}
                </small>
                <div className="text-end">
                    <span
                        className={`badge ${getBadgeClass(comment.status)}`}
                    >
                        {comment.status}
                    </span>
                    <button
                        onClick={handleApprove}
                        className={`btn m-1 ${comment.status === 'approved' ? 'btn-danger' : 'btn-success'}`}
                    >
                        {comment.status === 'approved' ? 'Disapprove' : 'Approve'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Comment;