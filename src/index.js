import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Post from "./Pages/Post/Post";
import Login from "./Pages/Login/Login";
import PostForm from "./Pages/Post/PostForm";
import CategoryList from "./Pages/Category/CategoryList";
import CategoryForm from "./Pages/Category/CategoryForm";
import AdminCommentList from "./Pages/Admin/CommentList";
import AdminLabelList from "./Pages/Labels/LabelList";
import LabelForm from "./Pages/Labels/LabelForm";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/post/new" element={<PostForm />} />
            <Route path="/admin/categories" element={<CategoryList />} />
            <Route path="/admin/categories/new" element={<CategoryForm />} />
            <Route path="/admin/categories/:id" element={<CategoryForm />} />
            <Route path="/admin/comments" element={<AdminCommentList />} />
            <Route path="/admin/labels" element={<AdminLabelList />} />
            <Route path="/admin/labels/new" element={<LabelForm />} />
            <Route path="/admin/labels/:id" element={<LabelForm />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
