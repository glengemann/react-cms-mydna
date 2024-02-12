import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from "../../Components/Layout";
import {useParams} from "react-router-dom";

function CategoryForm() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [categoryName, setCategoryName] = useState(category ? category.name : '');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:14000/api/categories/${id}`)
                .then(response => {
                    setCategory(response.data);
                    setCategoryName(response.data.name);
                })
                .catch(error => {
                    alert(error.message + ': ' + error.response.data.message);
                });
        }
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const categoryData = {
            name: categoryName
        };

        const pathUrl = `http://localhost:14000/api/categories/${category?.id}`;
        const postUrl = 'http://localhost:14000/api/categories';
        const url = category ? pathUrl : postUrl;
        const method = category ? 'put' : 'post';

        axios[method](url, categoryData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                setCategoryName('');
                alert('Category ' + (category ? 'updated' : 'created') + ' successfully');
            })
            .catch(error => {
                alert(error.message + ': ' + error.response.data.message)
            });
    }

    return (
        <Layout>
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
                        value={categoryName} onChange={e => setCategoryName(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {category ? 'Update' : 'Submit'}
                </button>
            </form>
        </Layout>
    );
}

export default CategoryForm;