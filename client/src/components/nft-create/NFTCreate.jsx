import * as nftsAPI from "../../api/nfts-api";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useState } from "react";
import PATH from "../../paths/paths"
import { toast } from 'react-toastify';

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
            return setError('Title is missing!');
        }

        if (values[CREATE_NFT_FORM_KEYS.CATEGORY] === '') {
            return setError('Category is missing!');
        }

        if (values[CREATE_NFT_FORM_KEYS.COLLECTION] === '') {
            return setError('Collection is missing!');
        }

        if (values[CREATE_NFT_FORM_KEYS.PRICE] === '') {
            return setError('MaxLevel is missing!');
        }

        if (values[CREATE_NFT_FORM_KEYS.IMAGE_URL] === '') {
            return setError('Image is missing!');
        }

        if (values[CREATE_NFT_FORM_KEYS.SUMMARY] === '') {
            return setError('Summary is missing!');
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
            <section className="bg-gray-50 bg-gray-50 pt-20 pb-10">
                <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-20 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl">
                                Create NFT
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>

                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-slate-700">NFT Title</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Enter NFT title..."
                                        onChange={onChange}
                                        value={values[CREATE_NFT_FORM_KEYS.TITLE]}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-slate-700">NFT Category</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        type="text"
                                        id="category"
                                        name="category"
                                        placeholder="Enter NFT category..."
                                        onChange={onChange}
                                        value={values[CREATE_NFT_FORM_KEYS.CATEGORY]}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="collectionName" className="block mb-2 text-sm font-medium text-slate-700">NFT Collection</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        type="text"
                                        id="collectionName"
                                        name="collectionName"
                                        placeholder="Enter NFT collection..."
                                        onChange={onChange}
                                        value={values[CREATE_NFT_FORM_KEYS.COLLECTION]}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-700">NFT Price</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        type="text"
                                        id="price"
                                        name="price"
                                        placeholder="Enter NFT price (e.g. 3 ETH)..."
                                        onChange={onChange}
                                        value={values[CREATE_NFT_FORM_KEYS.PRICE]}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-slate-700">NFT Image URL</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        type="text"
                                        id="imageUrl"
                                        name="imageUrl"
                                        placeholder="Upload a photo..."
                                        onChange={onChange}
                                        value={values[CREATE_NFT_FORM_KEYS.IMAGE_URL]}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="summary" className="block mb-2 text-sm font-medium text-slate-700">NFT Summary</label>
                                    <textarea
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        name="summary"
                                        id="summary"
                                        onChange={onChange}
                                        value={values[CREATE_NFT_FORM_KEYS.SUMMARY]}
                                    >
                                    </textarea>
                                </div>

                                <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create NFT</button>

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

export default NFTCreate;