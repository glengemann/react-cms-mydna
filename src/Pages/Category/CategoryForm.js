import React, {useState} from 'react';
import axios from 'axios';
import Layout from "../../Components/Layout";

function CategoryForm() {
    const [categoryName, setCategoryCategoryName] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const categoryData = {
            name: categoryName
        };

        const url = 'http://localhost:14000/api/categories';
        axios
            .post(url, categoryData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                setCategoryCategoryName('');
                alert('Category created successfully');
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
                        value={categoryName} onChange={e => setCategoryCategoryName(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </Layout>
    );
}

export default CategoryForm;