import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Components/Layout';
import {Link} from "react-router-dom";

function CategoryList() {
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:14000/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function deleteCategory(id) {
        const url = `http://localhost:14000/api/categories/${id}`;

        axios
            .delete(url,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                const newCategories = categories.filter(category => category.id !== id);
                setCategories(newCategories);

                alert('Category deleted successfully');
            })
            .catch(error => {
                alert(error.message + ': ' + error.response.data.message)
            });
    }

    return (
        <Layout>
            <div>
                <div className="d-flex justify-content-between p-2">
                    <h1>Categories</h1>
                    <div>
                        <Link
                            to="/admin/categories/new"
                            className="btn btn-primary"
                        >
                            Create Category
                        </Link>
                    </div>
                </div>

                <div className="col-8 table-responsive mx-auto">
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>
                                    <Link
                                        to={`/admin/categories/${category.id}`}
                                        className="btn btn-primary"
                                    >Edit</Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteCategory(category.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryList;