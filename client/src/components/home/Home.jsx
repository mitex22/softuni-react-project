import { useEffect, useState } from "react";
import * as nftsAPI from "../../api/nfts-api";

import Hero from "../hero/Hero";
import NFTListItem from "../nft-list/nft-list-item/NFTListItem";

const Home = () => {

    const [latestNFTs, setLatestNFTs] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await nftsAPI.getLatest();

            setLatestNFTs(result);
        })();
    }, []);

    return (
        <>
            <Hero />
            <section className='py-10'>

                <h1 className="mb-4 text-slate-700 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl">Latest NFTs</h1>

                <div className='container-xl lg:container m-auto'>
                    <div className='flex flex-col md:flex-row items-center justify-center gap-10 p-4 rounded-lg'>
                        {latestNFTs.length > 0
                            ? latestNFTs.map((nft) => (
                                <NFTListItem
                                    key={nft._id}
                                    {...nft}
                                />
                            ))
                            : <p className="no-articles">No games yet</p>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;