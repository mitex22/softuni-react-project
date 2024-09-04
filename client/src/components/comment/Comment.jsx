import React, { useContext, useEffect, useState } from 'react'

import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineWarningAmber } from "react-icons/md";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'react-toastify';

import * as likesAPI from "../../api/likes-api";
import AuthContext from '../../contexts/authContext';
import { formatDate } from '../../utils/formatDate';

const Comment = ({
    _ownerId,
    _id,
    comment,
    _createdOn,
    author,
    userId,
    isAuthenticated,
    delteCommentHandler
}) => {

    const { username } = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const [likes, setLikes] = useState([]);

    useEffect(() => {
        likesAPI.getAll(_id)
            .then((likes) => {
                setLikes(likes);
            })

    }, [_id]);

    const likeItem = likes.find(like => like._ownerUsername === username);

    const deleteCommentButtonClickHandler = async () => {
        setOpen(true);
    }

    const confirmDeleteHandler = async (confirmed) => {
        setOpen(false);

        if (confirmed) {
            await delteCommentHandler(_id);

            toast.success(`Successfully deleted comment!`);
        }
    }

    const listLikings = () => {
        let likesCount = likes.length;
        let likesAsString = '';

        if (likeItem) {
            if (likesCount === 1) {
                likesAsString = `You`
            } else {
                likesAsString = `You and ${likesCount - 1} more.`
            }
        } else {
            if (likesCount === 1) {
                likesAsString = `${likesCount} person.`
            } else {
                likesAsString = `${likesCount} people.`
            }
        }

        return (
            <div className='flex gap-2 flex-col sm:flex-row text-gray-700 text-sm my-2'>
                <h6>Liked by:</h6>
                <p>{likesAsString}</p>
            </div>
        )
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
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <MdOutlineWarningAmber aria-hidden="true" className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Delete comment
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this comment?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" onClick={() => setOpen(false)}>
                                <button
                                    type="button"
                                    onClick={() => confirmDeleteHandler(true)}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => confirmDeleteHandler(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <div className="bg-white p-4 rounded-lg shadow-md mb-2">
                <h3 className="text-lg font-bold">{author.username}</h3>

                <p className="text-gray-700 text-sm mb-2">Posted on: {formatDate(_createdOn)}</p>

                <p className="text-gray-700 italic">{comment}</p>

                {isAuthenticated && likes.length > 0
                    ? (listLikings())
                    : (null)
                }

                {_ownerId === userId &&
                    <button
                        className='bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 block'
                        onClick={() => deleteCommentButtonClickHandler()}>Delete
                    </button>}

                {_ownerId !== userId && isAuthenticated && !likeItem &&
                    <button
                        className='bg-slate-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block'
                        onClick={() => likeCommentButtonClickHandler(_id)}
                        title='Remove Like'>
                        <FaRegThumbsUp />
                    </button>}

                {_ownerId !== userId && isAuthenticated && likeItem &&
                    <button
                        className='bg-green-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block'
                        onClick={() => dislikeCommentButtonClickHandler(likeItem)}
                        title='Add Like'>
                        <FaRegThumbsUp />
                    </button>}
            </div>
        </>
    )
}

export default Comment;