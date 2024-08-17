import React, { useContext, useEffect, useState } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

import * as likesAPI from "../../api/likes-api";
import AuthContext from '../../contexts/authContext';

const Comment = ({
    _ownerId,
    _id,
    comment,
    author,
    userId,
    isAuthenticated,
    delteCommentHandler
}) => {

    const { username } = useContext(AuthContext);

    const [likes, setLikes] = useState([]);

    useEffect(() => {
        likesAPI.getAll(_id)
            .then((likes) => {
                setLikes(likes);
            })

    }, [_id]);

    const likeItem = likes.find(like => like._ownerUsername === username);

    const deleteCommentButtonClickHandler = async (commentId) => {
        const hasConfirmed = confirm(`Are you sure you want to delete this comment?`);

        if (hasConfirmed) {
            delteCommentHandler(commentId);
        }
    }

    const likeCommentButtonClickHandler = async (commentId) => {
        const newLike = await likesAPI.likeCreate(commentId, userId, username);

        setLikes(likes => [...likes, newLike]);
    }

    const dislikeCommentButtonClickHandler = async (likeItem) => {
        await likesAPI.likeRemove(likeItem._id);

        setLikes(likes => [...likes].filter((like) => (like._id !== likeItem._id)));
    }

    return (
        <>
            {/* <li className="comment">
                <p>{author.username}: {comment}</p>
                {_ownerId === userId && <button className="button" onClick={() => deleteCommentButtonClickHandler(_id)}>Delete</button>}
                {_ownerId !== userId && isAuthenticated && !likeItem && <button className="button" onClick={() => likeCommentButtonClickHandler(_id)}>Like</button>}
                {_ownerId !== userId && isAuthenticated && likeItem && <button className="button" onClick={() => dislikeCommentButtonClickHandler(likeItem)}>Dislike</button>}
            </li> */}

            <div className="bg-white p-4 rounded-lg shadow-md mb-2">
                <h3 className="text-lg font-bold">{author.username}</h3>

                <p className="text-gray-700 text-sm mb-2">Posted on April 16, 2023</p>

                <p className="text-gray-700">{comment}</p>

                {_ownerId === userId &&
                    <button
                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block'
                        onClick={() => deleteCommentButtonClickHandler(_id)}>Delete
                    </button>}

                {_ownerId !== userId && isAuthenticated && !likeItem &&
                    <button
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block'
                        onClick={() => likeCommentButtonClickHandler(_id)}>
                        <FaRegThumbsUp />
                    </button>}

                {_ownerId !== userId && isAuthenticated && likeItem &&
                    <button
                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block'
                        onClick={() => dislikeCommentButtonClickHandler(likeItem)}>
                        <FaRegThumbsDown />
                    </button>}
            </div>
        </>
    )
}

export default Comment;