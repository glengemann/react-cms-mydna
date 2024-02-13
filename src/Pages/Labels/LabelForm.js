import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from "../../Components/Layout";
import {useParams} from "react-router-dom";

function LabelForm() {
    const { id } = useParams();
    const [label, setLabel] = useState(null);
    const [labelName, setLabelName] = useState(label ? label.name : '');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:14000/api/labels/${id}`)
                .then(response => {
                    setLabel(response.data);
                    setLabelName(response.data.name);
                })
                .catch(error => {
                    alert(error.message + ': ' + error.response.data.message);
                });
        }
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const labelData = {
            name: labelName
        };

        const pathUrl = `http://localhost:14000/api/labels/${label?.id}`;
        const postUrl = 'http://localhost:14000/api/labels';
        const url = label ? pathUrl : postUrl;
        const method = label ? 'put' : 'post';

        axios[method](url, labelData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        })
            .then(response => {
                setLabelName('');
                alert('Label ' + (label ? 'updated' : 'created') + ' successfully');
            })
            .catch(error => {
                alert(error.message + ': ' + error.response.data.message)
            });
    }

    return (
        <Layout>
            <h1>{label ? 'Update' : 'Create'} Label</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={labelName}
                        onChange={e => setLabelName(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {label ? 'Update' : 'Submit'}
                </button>
            </form>
        </Layout>
    );
}

export default LabelForm;