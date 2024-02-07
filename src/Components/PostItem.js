import React from "react";
import {Link} from "react-router-dom";

const PostItem = ({post}) => {
    return (<div className="card m-2" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                    {post.content}
                </p>
                <Link
                    className="card-link"
                    to={`/post/${post.id}`}
                >Read</Link>
            </div>
        </div>);
}

export default PostItem;