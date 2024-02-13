import './App.css';
import ListPosts from './Pages/Post/ListPosts';
import {Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import Layout from "./Components/Layout";

function App() {
    return (
        <Layout>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">CMS</h1>
                        <p className="lead text-body-secondary">
                            A simple content management system.
                        </p>
                        <p>
                            <Link
                                to="/post/new"
                                className="btn btn-primary my-2"
                            >Create Post</Link>
                        </p>
                    </div>
                </div>
            </section>

            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <ListPosts/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default App;
