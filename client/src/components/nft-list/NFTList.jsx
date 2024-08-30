import NFTListItem from "./nft-list-item/NFTListItem";
import { useGetAllNFTs } from "../../hooks/useNFTs";

import Spinner from '../common/Spinner';
import { useState } from "react";

const NFTList = () => {

    const [loading, setLoading] = useState(true);
    const [nfts] = useGetAllNFTs(setLoading);

    return (
        <>
            <section className='bg-gray-50 pt-20 pb-10 px-20'>
                <div className='container-xl lg:container m-auto'>
                    <h1 className="mb-4 text-slate-700 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl">All NFTs</h1>

                    <p className="mb-6 text-slate-600 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">Discover and Collect Exclusive NFTs</p>

                    {loading ? (
                        <Spinner loading={loading} />
                    ) : nfts.length > 0
                        ? <div className='grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center'>
                            {
                                nfts.map((nft) => (
                                    <NFTListItem
                                        key={nft._id}
                                        {...nft}
                                    />
                                ))
                            }
                        </div>
                        : (
                            <p className="mb-6 text-slate-600 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 py-6">No NFTs available</p>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default NFTList;