import { useState } from 'react';
import { useGetPortfolioNFTs } from '../../../hooks/useNFTs';
import Spinner from '../../common/Spinner';
import { Navigate, useParams } from 'react-router-dom';
import NFTPortfolioListItem from '../../nft-list/nft-portfolio/nft-portfolio-list-item/NFTPortfolioListItem';

const UserPortfolio = () => {

    const { userName } = useParams();

    const [loading, setLoading] = useState(true);

    const [nfts] = useGetPortfolioNFTs(userName, setLoading);

    return (
        <>
            <section className='bg-gray-50 pt-20 pb-10 px-20'>
                <div className='container-xl lg:container m-auto'>
                    <h1 className="mb-10 text-slate-700 text-center text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-6xl">{userName}'s Collection</h1>

                    {loading ? (
                        <Spinner loading={loading} />
                    ) :
                        nfts.length > 0
                            ? (
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center'>
                                    {nfts.map((nft) => (
                                        <NFTPortfolioListItem
                                            key={nft._id}
                                            {...nft}
                                        />
                                    ))}
                                </div>
                            )
                            : (
                                <Navigate to="/not-found" />
                            )
                    }
                </div>
            </section>
        </>
    )
}

export default UserPortfolio;