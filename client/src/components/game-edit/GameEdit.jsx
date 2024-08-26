import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as nftsAPI from "../../api/nfts-api";
import PATH from "../../paths/paths"

const EDIT_GAME_FORM_KEYS = {
    TITLE: 'title',
    CATEGORY: 'category',
    COLLECTION: 'collectionName',
    PRICE: 'price',
    IMAGE_URL: 'imageUrl',
    SUMMARY: 'summary',
}

const GameEdit = () => {

    const navigate = useNavigate();
    const { nftId } = useParams();
    const [nft, setNFT] = useState({
        [EDIT_GAME_FORM_KEYS.TITLE]: '',
        [EDIT_GAME_FORM_KEYS.CATEGORY]: '',
        [EDIT_GAME_FORM_KEYS.COLLECTION]: '',
        [EDIT_GAME_FORM_KEYS.PRICE]: '',
        [EDIT_GAME_FORM_KEYS.IMAGE_URL]: '',
        [EDIT_GAME_FORM_KEYS.SUMMARY]: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        nftsAPI.getOne(nftId)
            .then(result => {
                setNFT(result);
            });
    }, [nftId]);

    const editNFTSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        // TODO: Edit Game Form validation
        if (values[EDIT_GAME_FORM_KEYS.TITLE] === '') {
            return setError('Title is missing!');
        }

        if (values[EDIT_GAME_FORM_KEYS.CATEGORY] === '') {
            return setError('Category is missing!');
        }

        if (values[EDIT_GAME_FORM_KEYS.MAX_LEVEL] === '') {
            return setError('MaxLevel is missing!');
        }

        if (values[EDIT_GAME_FORM_KEYS.IMAGE_URL] === '') {
            return setError('Image is missing!');
        }

        if (values[EDIT_GAME_FORM_KEYS.SUMMARY] === '') {
            return setError('Summary is missing!');
        }

        try {
            await nftsAPI.nftEdit(nftId, values);

            navigate(PATH.NFTs);
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }

    const onChange = (e) => {
        setNFT(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            {/* <section id="edit-page" className="auth">
                <form id="edit" onSubmit={editNFTSubmitHandler}>
                    <div className="container">

                        <h1>Edit Game</h1>

                        <label htmlFor="leg-title">Legendary title:</label>
                        <input 
                            type="text" id="title" 
                            name="title" 
                            value={nft.title} 
                            onChange={onChange} 
                            placeholder="Enter nft title..." />

                        <label htmlFor="category">Category:</label>
                        <input 
                            type="text" 
                            id="category" 
                            name="category" 
                            value={nft.category} 
                            onChange={onChange} 
                            placeholder="Enter nft category..." />

                        <label htmlFor="levels">MaxLevel:</label>
                        <input 
                            type="number" 
                            id="maxLevel" 
                            name="maxLevel" 
                            value={nft.maxLevel} 
                            onChange={onChange} 
                            min="1" 
                            placeholder="1" />

                        <label htmlFor="imageUrl">Image:</label>
                        <input 
                            type="text" 
                            id="imageUrl" 
                            name="imageUrl" 
                            value={nft.imageUrl} 
                            onChange={onChange} 
                            placeholder="Upload a photo..." />

                        <label htmlFor="summary">Summary:</label>
                        <textarea 
                            name="summary" 
                            value={nft.summary} 
                            onChange={onChange} 
                            id="summary"
                        >
                        </textarea>

                        {error &&
                            <p>
                                <span>{error}</span>
                            </p>
                        }

                        <input className="btn submit" type="submit" value="Edit NFT" />

                    </div>
                </form>
            </section> */}

            <section className="bg-gray-50 pb-12">
                <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl dark:text-white">
                                Create NFT
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={editNFTSubmitHandler}>

                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">NFT Title</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Enter NFT title..."
                                        onChange={onChange}
                                        value={nft.title} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">NFT Category</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="category"
                                        name="category"
                                        placeholder="Enter NFT category..."
                                        onChange={onChange}
                                        value={nft.category}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="collectionName" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">NFT Collection</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="collectionName"
                                        name="collectionName"
                                        placeholder="Enter NFT collection..."
                                        onChange={onChange}
                                        value={nft.collectionName}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">NFT Price</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="price"
                                        name="price"
                                        placeholder="Enter NFT price (e.g. 3 ETH)..."
                                        onChange={onChange}
                                        value={nft.price}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">NFT Image URL</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="imageUrl"
                                        name="imageUrl"
                                        placeholder="Upload a photo..."
                                        onChange={onChange}
                                        value={nft.imageUrl}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="summary" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">NFT Summary</label>
                                    <textarea
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="summary"
                                        id="summary"
                                        onChange={onChange}
                                        value={nft.summary}
                                    >
                                    </textarea>
                                </div>

                                <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit NFT</button>

                                {error &&
                                    <p>
                                        <span>{error}</span>
                                    </p>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GameEdit;