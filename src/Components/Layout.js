import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import AdminNav from "../Pages/Admin/AdminNav";

function Layout({ children }) {
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
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary m-2">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">Home</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link to="/login" className="nav-link"
                                      style={{display: isLoggedIn ? 'none' : 'block'}}
                                >
                                    Login
                                </Link>
                                <a className="nav-link" onClick={logout}
                                   style={{display: isLoggedIn ? 'block' : 'none'}}
                                >
                                    Logout
                                </a>
                            </div>
                            <AdminNav isLoggedIn={isLoggedIn}/>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer className="text-body-secondary py-5">
                <div className="container">
                    <p className="float-end mb-1">
                        <a href="#">Back to top</a>
                    </p>
                    <p className="mb-1">Album example is &copy; Bootstrap, but please download and customize it for
                        yourself!</p>
                    <p className="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a
                        href="../getting-started/introduction/">getting started guide</a>.</p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;