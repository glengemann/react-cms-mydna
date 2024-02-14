import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Layout from "../../Components/Layout";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function uploadAdapter(loader) {
    const token = localStorage.getItem('token');

    return {
        upload: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const file = await loader.file;
                    const response = await axios.request({
                        method: "POST",
                        url: `http://localhost:14000/api/upload`,
                        data: {
                            file
                        },
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                        }
                    });
                    resolve({
                        default: `http://localhost:14000/${response.data.file}`
                    });
                } catch (error) {
                    reject("Hello");
                }
            });
        },
        abort: () => {}
    };
}
function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
    };
}

function PostForm() {
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
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

            {!isLoggedIn && (
                <div className="alert alert-warning" role="alert">
                    You need to be logged in to create a post.
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
                    <CKEditor
                        config={{
                            extraPlugins: [uploadPlugin]
                        }}
                        editor={ClassicEditor}
                        data={content}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data)
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
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
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isLoggedIn}
                >
                    Submit
                </button>
            </form>
        </Layout>
    );
}

export default PostForm;