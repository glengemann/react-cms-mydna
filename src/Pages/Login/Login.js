import React, {useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Layout from "../../Components/Layout";

function Login() {
    const [email, setEmail] = useState('admin@cms.com');
    const [password, setPassword] = useState('password');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            email,
            password
        };

        axios.post('http://localhost:14000/api/login', data)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                console.log(`Login successful ${response}`);

                window.location.href = '/';
            }).catch((response) => {
                console.log(`Login failed ${response}`);
            });

        console.log(`Logging in with username: ${email} and password: ${password}`);
    }

    return (
        <Layout>
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth: "300px"}}>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Layout>
    );
}

export default Login;