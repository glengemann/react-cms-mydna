import React from 'react';

function Error({status}) {
    let message;
    switch (status) {
        case 401:
            message = 'Unauthorized';
            break;
        case 404:
            message = 'Not Found';
            break;
        default:
            message = 'An error occurred';
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div>
                    <h1 className="display-1">{status}</h1>
                    <p className="lead">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default Error;