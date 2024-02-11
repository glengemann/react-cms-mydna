import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Components/Layout';

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
                {categories.map(category => (
                    <div key={category.id}>
                        <h2>{category.name}</h2>
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default CategoryList;