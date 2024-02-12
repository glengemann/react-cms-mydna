import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Components/Layout';
import {Link} from "react-router-dom";

function CategoryList() {
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

    return (
        <Layout>
            <div>
                <h1>Categories</h1>

                <Link
                    to="/admin/categories/new"
                    className="btn btn-primary"
                >
                    Create Category
                </Link>

                <table className="table table-striped">
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
                                    to={`/admin/categories/edit/${category.id}`}
                                    className="btn btn-primary"
                                >Edit</Link>
                                <button className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default CategoryList;