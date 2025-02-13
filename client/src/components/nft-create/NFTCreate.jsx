import * as nftsAPI from "../../api/nfts-api";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useState } from "react";
import PATH from "../../paths/paths"
import { toast } from 'react-toastify';
import { isValidURL } from "../../utils/urlValidator";

const CREATE_NFT_FORM_KEYS = {
    TITLE: 'title',
    CATEGORY: 'category',
    COLLECTION: 'collectionName',
    PRICE: 'price',
    IMAGE_URL: 'imageUrl',
    SUMMARY: 'summary',
}

const NFTCreate = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const submitFormHandler = async (values) => {

        if (values[CREATE_NFT_FORM_KEYS.TITLE] === '') {
            return setError({ title: 'Title is missing!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.TITLE].trim() === '') {
            return setError({ title: 'Title should contain characters or digits!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.CATEGORY] === '') {
            return setError({ category: 'Category is missing!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.CATEGORY].trim() === '') {
            return setError({ category: 'Category should contain characters or digits!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.COLLECTION] === '') {
            return setError({ collection: 'Collection is missing!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.COLLECTION].trim() === '') {
            return setError({ collection: 'Collection should contain characters or digits!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.PRICE] === '') {
            return setError({ price: 'Price is missing!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.IMAGE_URL] === '') {
            return setError({ image: 'Image URL is missing!' });
        }

        if (!isValidURL(values[CREATE_NFT_FORM_KEYS.IMAGE_URL])) {
            return setError({ image: 'Image URL must be in valid format!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.SUMMARY] === '') {
            return setError({ summary: 'Summary is missing!' });
        }

        if (values[CREATE_NFT_FORM_KEYS.SUMMARY].trim() === '') {
            return setError({ summary: 'Summary should contain characters or digits!' });
        }

        try {
            await nftsAPI.nftCreate(values);

            toast.success(`Successfully created NFT ${values.title}!`);

            navigate(PATH.NFTs);
        } catch (error) {
            console.log('Error fetching data', error);
        }
    }

    const { values, onChange, onSubmit } = useForm(submitFormHandler, {
        [CREATE_NFT_FORM_KEYS.TITLE]: '',
        [CREATE_NFT_FORM_KEYS.CATEGORY]: '',
        [CREATE_NFT_FORM_KEYS.COLLECTION]: '',
        [CREATE_NFT_FORM_KEYS.PRICE]: '',
        [CREATE_NFT_FORM_KEYS.IMAGE_URL]: '',
        [CREATE_NFT_FORM_KEYS.SUMMARY]: '',
    });

    return (
        <>
            <section className="bg-gray-50 pt-20 pb-10">
                <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-10 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl">
                                Create NFT
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>

                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-slate-700">NFT Title</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Enter NFT title..."
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[CREATE_NFT_FORM_KEYS.TITLE]}
                                    />
                                </div>

                                {error.title &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.title}</span>
                                }

                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-slate-700">NFT Category</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        type="text"
                                        id="category"
                                        name="category"
                                        placeholder="Enter NFT category..."
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[CREATE_NFT_FORM_KEYS.CATEGORY]}
                                    />
                                </div>

                                {error.category &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.category}</span>
                                }

                                <div>
                                    <label htmlFor="collectionName" className="block mb-2 text-sm font-medium text-slate-700">NFT Collection</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        type="text"
                                        id="collectionName"
                                        name="collectionName"
                                        placeholder="Enter NFT collection..."
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[CREATE_NFT_FORM_KEYS.COLLECTION]}
                                    />
                                </div>

                                {error.collection &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.collection}</span>
                                }

                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-700">NFT Price (in ETH)</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="Enter NFT price (e.g. 3)..."
                                        min={0}
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[CREATE_NFT_FORM_KEYS.PRICE]}
                                    />
                                </div>

                                {error.price &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.price}</span>
                                }

                                <div>
                                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-slate-700">NFT Image URL</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        type="text"
                                        id="imageUrl"
                                        name="imageUrl"
                                        placeholder="Upload a photo..."
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[CREATE_NFT_FORM_KEYS.IMAGE_URL]}
                                    />
                                </div>

                                {error.image &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.image}</span>
                                }

                                <div>
                                    <label htmlFor="summary" className="block mb-2 text-sm font-medium text-slate-700">NFT Summary</label>
                                    <textarea
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        name="summary"
                                        id="summary"
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[CREATE_NFT_FORM_KEYS.SUMMARY]}
                                    >
                                    </textarea>
                                </div>

                                {error.summary &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.summary}</span>
                                }

                                <button type="submit" className="w-full text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create NFT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NFTCreate;