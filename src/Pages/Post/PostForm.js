import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Layout from "../../Components/Layout";

function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const url = 'http://localhost:14000/api/categories';
        const token = localStorage.getItem('token');

        axios
            .get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                setCategories(response.data);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:14000/api/posts';
        const token = localStorage.getItem('token');

        axios
            .post(url, {title, content, category_id: category}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(() => {
                alert('The Post was created.')
                window.location.href = '/';
            })
            .catch((error) => {
                setErrorMessage(error.message + ': ' + error.response.data.message);
            });
    }

    return (
        <Layout>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="title"
                        className="form-labtitleel"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={title} onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >Content</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="8"
                        required
                        value={content} onChange={e => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option selected>Open this select menu</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Layout>
    );
}

export default PostForm;