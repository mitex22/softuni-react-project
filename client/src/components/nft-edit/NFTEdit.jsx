import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import * as nftsAPI from "../../api/nfts-api";
import PATH from "../../paths/paths"
import Spinner from '../common/Spinner';
import { isValidURL } from '../../utils/urlValidator';

const EDIT_NFT_FORM_KEYS = {
    TITLE: 'title',
    CATEGORY: 'category',
    COLLECTION: 'collectionName',
    PRICE: 'price',
    IMAGE_URL: 'imageUrl',
    SUMMARY: 'summary',
}

const NFTEdit = () => {

    const navigate = useNavigate();
    const { nftId } = useParams();
    const [nft, setNFT] = useState({
        [EDIT_NFT_FORM_KEYS.TITLE]: '',
        [EDIT_NFT_FORM_KEYS.CATEGORY]: '',
        [EDIT_NFT_FORM_KEYS.COLLECTION]: '',
        [EDIT_NFT_FORM_KEYS.PRICE]: '',
        [EDIT_NFT_FORM_KEYS.IMAGE_URL]: '',
        [EDIT_NFT_FORM_KEYS.SUMMARY]: '',
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const result = await nftsAPI.getOne(nftId);

                setNFT(result);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [nftId]);

    const editNFTSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        if (values[EDIT_NFT_FORM_KEYS.TITLE] === '') {
            return setError({ title: 'Title is missing!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.TITLE].trim() === '') {
            return setError({ title: 'Title should contain characters or digits!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.CATEGORY] === '') {
            return setError({ category: 'Category is missing!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.CATEGORY].trim() === '') {
            return setError({ category: 'Category should contain characters or digits!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.COLLECTION] === '') {
            return setError({ collection: 'Collection is missing!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.COLLECTION].trim() === '') {
            return setError({ collection: 'Collection should contain characters or digits!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.PRICE] === '') {
            return setError({ price: 'Price is missing!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.IMAGE_URL] === '') {
            return setError({ image: 'Image URL is missing!' });
        }

        if (!isValidURL(values[EDIT_NFT_FORM_KEYS.IMAGE_URL])) {
            return setError({ image: 'Image URL must be in valid format!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.SUMMARY] === '') {
            return setError({ summary: 'Summary is missing!' });
        }

        if (values[EDIT_NFT_FORM_KEYS.SUMMARY].trim() === '') {
            return setError({ summary: 'Summary should contain characters or digits!' });
        }

        try {
            await nftsAPI.nftEdit(nftId, values);

            toast.success(`Successfully edited ${nft.title}!`);

            navigate(PATH.NFTs);
        } catch (error) {
            // Error notification
            console.log('Error fetching data', error);
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
            <section className="bg-gray-50 pt-20 pb-10">
                <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0">
                    {loading
                        ? (<Spinner loading={loading} />)
                        : (
                            <div className="w-full bg-white rounded-lg shadow md:mt-20 sm:max-w-md xl:p-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl">
                                        Edit NFT
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={editNFTSubmitHandler}>

                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-slate-700">NFT Title</label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-700 focus:border-indigo-800 block w-full p-2.5"
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="Enter NFT title..."
                                                onChange={onChange}
                                                onInput={() => setError('')}
                                                value={nft.title}
                                            />
                                        </div>

                                        {error.title &&
                                            <span className="text-xs text-red-600 animate-pulse">{error.title}</span>
                                        }

                                        <div>
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-slate-700">NFT Category</label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-700 focus:border-indigo-800 block w-full p-2.5"
                                                type="text"
                                                id="category"
                                                name="category"
                                                placeholder="Enter NFT category..."
                                                onChange={onChange}
                                                onInput={() => setError('')}
                                                value={nft.category}
                                            />
                                        </div>

                                        {error.category &&
                                            <span className="text-xs text-red-600 animate-pulse">{error.category}</span>
                                        }

                                        <div>
                                            <label htmlFor="collectionName" className="block mb-2 text-sm font-medium text-slate-700">NFT Collection</label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-700 focus:border-indigo-800 block w-full p-2.5"
                                                type="text"
                                                id="collectionName"
                                                name="collectionName"
                                                placeholder="Enter NFT collection..."
                                                onChange={onChange}
                                                onInput={() => setError('')}
                                                value={nft.collectionName}
                                            />
                                        </div>

                                        {error.collection &&
                                            <span className="text-xs text-red-600 animate-pulse">{error.collection}</span>
                                        }

                                        <div>
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-700">NFT Price</label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-700 focus:border-indigo-800 block w-full p-2.5"
                                                type="number"
                                                id="price"
                                                name="price"
                                                min={0}
                                                placeholder="Enter NFT price (e.g. 3 ETH)..."
                                                onChange={onChange}
                                                onInput={() => setError('')}
                                                value={nft.price}
                                            />
                                        </div>

                                        {error.price &&
                                            <span className="text-xs text-red-600 animate-pulse">{error.price}</span>
                                        }

                                        <div>
                                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-slate-700">NFT Image URL</label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-700 focus:border-indigo-800 block w-full p-2.5"
                                                type="text"
                                                id="imageUrl"
                                                name="imageUrl"
                                                placeholder="Upload a photo..."
                                                onChange={onChange}
                                                onInput={() => setError('')}
                                                value={nft.imageUrl}
                                            />
                                        </div>

                                        {error.image &&
                                            <span className="text-xs text-red-600 animate-pulse">{error.image}</span>
                                        }

                                        <div>
                                            <label htmlFor="summary" className="block mb-2 text-sm font-medium text-slate-700">NFT Summary</label>
                                            <textarea
                                                className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-700 focus:border-indigo-800 block w-full p-2.5"
                                                name="summary"
                                                id="summary"
                                                onChange={onChange}
                                                onInput={() => setError('')}
                                                value={nft.summary}
                                            >
                                            </textarea>
                                        </div>

                                        {error.summary &&
                                            <span className="text-xs text-red-600 animate-pulse">{error.summary}</span>
                                        }

                                        <button type="submit" className="w-full text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit NFT</button>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default NFTEdit;