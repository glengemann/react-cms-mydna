import './App.css';
import ListPosts from './Components/ListPosts';
import {Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';

function App() {
    const isLoggedIn = localStorage.getItem('token') !== null;

    const logout = async () => {
        const url = 'http://localhost:14000/api/logout';
        const token = localStorage.getItem('token');

        axios
            .post(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            })
            .catch(() => {
                console.log('Logout failed');
            });
    }

    return (
        <div className="">
            <div className="container">
                <header className="d-flex justify-content-center py-3">
                    <ul className="nav nav-pills">
                        <Link to="/" className="nav-item nav-link">Home</Link>
                        <Link to="/login" className="nav-item nav-link"
                            style={{display: isLoggedIn ? 'none' : 'block'}}
                        >
                            Login
                        </Link>
                        <a className="nav-item nav-link" onClick={logout}
                            style={{display: isLoggedIn ? 'block' : 'none'}}
                        >
                            Logout
                        </a>
                    </ul>
                </header>
            </div>

            <header className="">
                <h1 className="">Posts</h1>
                <ListPosts/>
            </header>
        </div>
    );
}

export default App;
