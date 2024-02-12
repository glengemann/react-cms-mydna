import React from 'react';
import { Link } from 'react-router-dom';

function AdminNav({ isLoggedIn }) {
    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="navbar-nav ms-auto">
            <Link to="/admin/categories" className="nav-link">
                Categories
            </Link>
            <Link to="/admin/comments" className="nav-link">
                Comments
            </Link>
            <Link to="/admin/labels" className="nav-link">
                Labels
            </Link>
        </div>
    );
}

export default AdminNav;