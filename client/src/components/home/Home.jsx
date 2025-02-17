import { useEffect, useState } from "react";
import * as nftsAPI from "../../api/nfts-api";

import Hero from "../hero/Hero";
import NFTListItem from "../nft-list/nft-list-item/NFTListItem";
import Spinner from '../common/Spinner';

const Home = () => {

    const [latestNFTs, setLatestNFTs] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await nftsAPI.getLatest();

                setLatestNFTs(result);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <Hero />
            <section id="latest-nfts" className='py-10 bg-gray-50'>

                <h2 className="mb-4 text-slate-700 text-center text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-6xl">Latest NFTs</h2>

                <div className='container-xl lg:container m-auto'>
                    {loading
                        ? (
                            <Spinner loading={loading} />
                        )
                        : (<div className='flex flex-col md:flex-row items-center justify-center gap-10 p-4 rounded-lg'>
                            {latestNFTs.length > 0
                                ? latestNFTs.map((nft) => (
                                    <NFTListItem
                                        key={nft._id}
                                        {...nft}
                                    />
                                ))
                                : <p className="mb-6 text-slate-600 text-center text-lg font-normal lg:text-xl sm:px-16 xl:px-48">No NFTs available</p>
                            }
                        </div>)
                    }
                </div>
            </section>
        </>
    )
}

export default Home;