import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { MdShoppingCart, MdDelete, MdEdit } from "react-icons/md";

import { useGetOneNFT } from "../../hooks/useNFTs";
import { useGetAllComments } from "../../hooks/useComments";
import useForm from "../../hooks/useForm";

import AuthContext from "../../contexts/authContext";
import * as nftsAPI from "../../api/nfts-api";
import * as commentsAPI from "../../api/commnets-api";

import { pathToUrl } from "../../utils/pathUtils";
import { formatDate } from "../../utils/formatDate";
import PATH from "../../paths/paths";
import Comment from "../comment/Comment";

const CREATE_COMMENT_FORM_KEYS = {
    COMMENT: 'comment',
}

const NFTDetails = () => {
    const navigate = useNavigate();

    const { userId, username, isAuthenticated } = useContext(AuthContext);

    const { nftId } = useParams();

    const [nft] = useGetOneNFT(nftId);

    const [comments, dispatch] = useGetAllComments(nftId);

    const isNFTowner = userId === nft._ownerId;

    const [error, setError] = useState('');

    const deleteNFTButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${nft.title}?`);

        if (hasConfirmed) {
            await nftsAPI.nftDelete(nftId);

            navigate(PATH.NFTs);
        }
    }

    const buyNFTbuttonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to buy ${nft.title}?`);

        if (hasConfirmed) {
            await nftsAPI.nftBuy(nftId, userId, username);

            navigate(PATH.NFT_PORTFOLIO);
        }
    }

    const commentSubmitHandler = async (values) => {

        if (values.comment.trim() === '') {
            return setError('Cannot submit empty comment!');
        }

        const newComment = await commentsAPI.commentCreate({ ...values, nftId });

        dispatch({ type: 'ADD_COMMENT', payload: { ...newComment, author: { username } } });

        setError('');

        values.comment = '';
    }

    const { values, onChange, onSubmit } = useForm(commentSubmitHandler, {
        [CREATE_COMMENT_FORM_KEYS.COMMENT]: '',
    });

    const delteCommentHandler = async (commentId) => {
        await commentsAPI.commentDelete(commentId);

        dispatch({ type: 'DELETE_COMMENT', payload: commentId });
    }

    return (
        <>
            <section className='bg-gray-50 pt-14'>
                <div className='container m-auto py-10 px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                        <main>
                            <div className='flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                                <img className="mx-auto mb-4 lg:mb-0 size-64 rounded" src={nft.imageUrl} alt="Sunset in the mountains" />

                                <div className="flex flex-col m-auto justify-center items-center">
                                    <h1 className='text-3xl text-indigo-800 font-bold mb-4'>{nft.title}</h1>

                                    <h3 className='text-lg font-bold mb-2'>
                                        Price
                                    </h3>
                                    <p>{nft.price}</p>
                                </div>
                            </div>

                            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                                    NFT Description
                                </h3>

                                <p className='mb-4'>{nft.summary}</p>
                            </div>

                            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                                <h2 className="text-indigo-800 text-lg font-bold mb-4">Comments</h2>

                                <ul>
                                    {comments.map((comment) => (
                                        <Comment
                                            key={comment._id}
                                            {...comment}
                                            userId={userId}
                                            isAuthenticated={isAuthenticated}
                                            nftId={nftId}
                                            delteCommentHandler={delteCommentHandler}
                                        />
                                    ))}
                                </ul>

                                {comments.length === 0 && (
                                    <p>No comments.</p>
                                )}

                                {isAuthenticated && (
                                    <form className="mt-4 bg-white p-4 rounded-lg shadow-md" onSubmit={onSubmit}>
                                        <div className="mb-4">
                                            <textarea
                                                className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                id="comment" rows="3"
                                                placeholder="Leave a comment..."
                                                name="comment"
                                                onChange={onChange}
                                                value={values[CREATE_COMMENT_FORM_KEYS.COMMENT]}
                                            >
                                            </textarea>
                                        </div>

                                        {error &&
                                            <p>
                                                <span>{error}</span>
                                            </p>
                                        }

                                        <button
                                            className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit">
                                            Submit
                                        </button>
                                    </form>
                                )}
                            </div>
                        </main>

                        <aside>
                            <div className='bg-white p-6 rounded-lg shadow-md'>
                                <h3 className='text-xl font-bold mb-4'>Collection Name:</h3>

                                <h2 className='text-2xl'>{nft.collectionName}</h2>

                                <hr className='my-4' />

                                <h3 className='text-xl font-bold'>Creator Name:</h3>

                                <p className='my-2 border-b'>
                                    {nft?.author?.username}
                                </p>

                                <h3 className='text-xl font-bold'>Creator Email:</h3>

                                <p className='my-2 border-b'>
                                    {nft?.author?.email}
                                </p>

                                <h3 className='text-xl font-bold'>Created On:</h3>

                                <p className='my-2 border-b'>
                                    {' '}
                                    {formatDate(nft._createdOn)}
                                </p>
                            </div>

                            {isAuthenticated && (
                                <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                                    <h3 className='text-xl font-bold mb-6'>Manage NFT</h3>
                                    {isNFTowner && (
                                        <>
                                            <Link
                                                to={pathToUrl(PATH.NFT_EDIT, { nftId })}
                                                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline block text-center inline-flex justify-center items-center gap-2 me-2'
                                            >
                                                <MdEdit /> <span>Edit NFT</span>
                                            </Link>

                                            <button
                                                className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2'
                                                onClick={deleteNFTButtonClickHandler}>
                                                <MdDelete /> <span>Delete NFT</span>
                                            </button>
                                        </>
                                    )}

                                    <button
                                        className='bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2'
                                        onClick={buyNFTbuttonClickHandler}>
                                        <MdShoppingCart /> <span>Buy NFT</span>
                                    </button>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NFTDetails;