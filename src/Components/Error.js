import React from 'react';

function Error() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div>
                    <h1 className="display-1">404</h1>
                    <p className="lead">Page not found</p>
                </div>
            </div>
        </div>
    );
}

export default Error;