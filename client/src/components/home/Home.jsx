import { useEffect, useState } from "react";
import * as nftsAPI from "../../api/nfts-api";

import Hero from "../hero/Hero";
import NFTListItem from "../game-list/nft-list-item/NFTListItem";

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