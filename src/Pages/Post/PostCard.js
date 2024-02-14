import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

const PostCard = ({post}) => {
    const truncatedContent = post.content.length > 128 ? post.content.substring(0, 128) + "..." : post.content;

    return (
        <div className="card shadow-sm">
            <svg className="bd-placeholder-img card-img-top" width="100%" height="125"
                 xmlns="http://www.w3.org/2000/svg" role="img"
                 aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                 focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"/>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Awesome Post
                </text>
            </svg>
            <div className="card-body">
                <h5 className="card-title">
                    {post.title}
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                        >
                            <Link
                                className="card-link"
                                to={`/post/${post.id}`}
                            >View</Link>
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            disabled
                        >
                            Edit
                        </button>
                    </div>
                    <small className="text-body-secondary">
                        {moment(post.created_at).fromNow()}
                    </small>
                </div>
            </div>
        </div>
    );
}

export default PostCard;