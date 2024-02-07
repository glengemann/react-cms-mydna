import './App.css';
import ListPosts from './Components/ListPosts';
import {Link} from "react-router-dom";
import React from "react";

function App() {
    return (
        <div className="">
            <div className="container">
                <header className="d-flex justify-content-center py-3">
                    <ul className="nav nav-pills">
                        <Link to="/" className="nav-item nav-link">Home</Link>
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
