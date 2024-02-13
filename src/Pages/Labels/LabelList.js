import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../../Components/Layout";
import {Link} from "react-router-dom";

function LabelList() {
    const token = localStorage.getItem('token');
    const [labels, setLabels] = useState([]);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(0);

    useEffect(() => {
        const url = 'http://localhost:14000/api/labels';

        axios
            .get(url, {
                headers: {
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                setLabels(response.data);
            })
            .catch((error) => {
                setError(true);
                setErrorCode(error.response?.status);
            });
    }, []);

    const removeLabel = (commentId) => {
        setLabels(labels.filter(comment => comment.id !== commentId));
    }

    const handleDelete = (commentId) => {
        axios
            .delete(`http://localhost:14000/api/labels/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                removeLabel(commentId);
                alert('Label deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting label', error);
                alert('Error deleting label');
            });
    };


    return (
        <Layout>
            <div className="d-flex justify-content-between p-2">
                <h1>Labels</h1>
                <div>
                    <Link
                        to="/admin/labels/new"
                        className="btn btn-primary"
                    >
                        Create Label
                    </Link>
                </div>
            </div>
            <table className="col-8 table-responsive mx-auto">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {labels.map((label, index) => (
                    <tr key={index}>
                        <td>{label.name}</td>
                        <td>
                            <Link
                                to={`/admin/labels/${label.id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(label.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default LabelList;