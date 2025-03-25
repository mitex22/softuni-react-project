import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { MdShoppingCart, MdDelete, MdEdit, MdOutlineWarningAmber } from "react-icons/md";

import { toast } from 'react-toastify';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

import { useGetOneNFT } from "../../hooks/useNFTs";
import { useGetAllComments } from "../../hooks/useComments";
import useForm from "../../hooks/useForm";

import AuthContext from "../../contexts/authContext";
import * as nftsAPI from "../../api/nfts-api";
import * as commentsAPI from "../../api/commnets-api";
import * as ethAPI from "../../api/eth-api";

import { pathToUrl } from "../../utils/pathUtils";
import { formatDate } from "../../utils/formatDate";
import PATH from "../../paths/paths";
import Comment from "../comment/Comment";
import Spinner from '../common/Spinner';

const CREATE_COMMENT_FORM_KEYS = {
    COMMENT: 'comment',
}

const NFTDetails = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { nftId } = useParams();

    const [portfolio, setPortfolio] = useState([]);

    const [currentETHprice, setCurrentETHprice] = useState('');

    useEffect(() => {
        (async () => {
            const result = await nftsAPI.getAllPortfolios();

            setPortfolio(result);
        })();
    }, [nftId]);

    const editBtnClass = () =>
        portfolio.some(item => item['nftId'] === nftId)
            ? 'disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none cursor-not-allowed text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2'
            : 'bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2';

    const editLinkClass = () =>
        portfolio.some(item => item['nftId'] === nftId)
            ? 'display: inline-flex justify-center items-center gap-2 pointer-events-none cursor-default'
            : 'w-full display: inline-flex justify-center items-center gap-2';

    const deleteBtnClass = () =>
        portfolio.some(item => item['nftId'] === nftId)
            ? 'disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none cursor-not-allowed text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2'
            : 'bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2';

    const [buying, setBuying] = useState(false);

    const buyBtnClass = () =>
        portfolio.some(item => item['nftId'] === nftId) || buying
            ? 'disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none cursor-not-allowed text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2'
            : 'bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2';

    const { userId, username, isAuthenticated } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [nft] = useGetOneNFT(nftId, setLoading);

    const [comments, dispatch] = useGetAllComments(nftId);

    const isNFTowner = userId === nft._ownerId;

    const [error, setError] = useState('');

    const deleteNFTButtonClickHandler = async () => {
        setOpen(true);
    }

    const confirmDeleteHandler = async (confirmed) => {
        setOpen(false);

        if (confirmed) {
            await nftsAPI.nftDelete(nftId);

            toast.success(`Successfully deleted ${nft.title}!`);

            navigate(PATH.NFTs);
        }
    }

    const buyNFTbuttonClickHandler = async () => {
        setBuying(true);

        try {
            await nftsAPI.nftBuy(nftId, userId, username);
            toast.success(`Successfully bought ${nft.title} for ${nft.price} ETH!`);
            navigate(PATH.NFT_PORTFOLIO);
        } catch (error) {
            toast.error('Failed to buy NFT. Please try again.');
        } finally {
            setBuying(false);
        }
    };

    const commentSubmitHandler = async (values) => {

        if (values.comment.trim() === '') {
            return setError({ comment: 'Cannot submit empty comment!' });
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

    useEffect(() => {
        const getCurrentPrice = async () => {
            const result = await ethAPI.getETHcurrentPrice();
            setCurrentETHprice(result);
        }

        getCurrentPrice();

        const intervalId = setInterval(() => {
            getCurrentPrice();
        }, 10000);

        return () => clearInterval(intervalId);

    }, [nftId]);

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
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-slate-900">
                                            Delete NFT
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-slate-500">
                                                Are you sure you want to delete <span className="font-bold">{nft.title}</span>? All of your data will be permanently removed.
                                                This action cannot be undone.
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
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <section className='bg-gray-50 pt-14 min-h-[100vh]'>
                <div className='container m-auto py-10 px-6'>
                    {loading
                        ? <Spinner loading={loading} />
                        : (
                            <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                                <main>
                                    <div className='flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                                        <img className="mx-auto mb-4 lg:mb-0 size-64 rounded" src={nft.imageUrl} alt={`${nft.title}'s pic`} />

                                        <div className="flex flex-col m-auto justify-center items-center">
                                            <h1 className='text-3xl text-indigo-800 font-bold mb-4'>{nft.title}</h1>

                                            <h3 className='text-lg font-bold mb-2'>
                                                Price: {nft.price} ETH
                                            </h3>
                                            <p>Current price: {Number(nft.price) * currentETHprice.EUR} EUR</p>
                                            <p className="italic text-xs">(live rate from <a className="text-indigo-500 visited:text-indigo-800" target="blank" href="https://www.cryptocompare.com/">cryptocompare.com</a>)</p>
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
                                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                                        id="comment" rows="3"
                                                        placeholder="Leave a comment..."
                                                        name="comment"
                                                        onChange={onChange}
                                                        onInput={() => setError('')}
                                                        value={values[CREATE_COMMENT_FORM_KEYS.COMMENT]}
                                                    >
                                                    </textarea>
                                                </div>

                                                {error.comment &&
                                                    <span className="block text-xs text-red-600 animate-pulse mb-4">{error.comment}</span>
                                                }

                                                <button
                                                    className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

                                        <h2 className='text-lg'>{nft.collectionName}</h2>

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
                                            <h3 className='text-xl font-bold mb-6'>NFT Actions</h3>
                                            {isNFTowner && (
                                                <>
                                                    <button
                                                        className={editBtnClass()}
                                                        disabled={portfolio.some(item => item['nftId'] === nftId) ? 'disabled' : ''}
                                                    >

                                                        <Link
                                                            to={pathToUrl(PATH.NFT_EDIT, { nftId })}
                                                            className={editLinkClass()}
                                                        >
                                                            <MdEdit /> <span>Edit NFT</span>
                                                        </Link>
                                                    </button>

                                                    <button
                                                        className={deleteBtnClass()}
                                                        onClick={deleteNFTButtonClickHandler}
                                                        disabled={portfolio.some(item => item['nftId'] === nftId) ? 'disabled' : ''}
                                                    >
                                                        <MdDelete /> <span>Delete NFT</span>
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                className={buyBtnClass()}
                                                onClick={buyNFTbuttonClickHandler}
                                                disabled={portfolio.some(item => item['nftId'] === nftId) || buying}
                                            >
                                                <MdShoppingCart /> <span>Buy NFT</span>
                                            </button>
                                        </div>
                                    )}
                                </aside>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default NFTDetails;