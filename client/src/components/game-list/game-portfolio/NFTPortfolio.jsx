import { useContext, useState } from 'react';
import { useGetPortfolioNFTs } from '../../../hooks/useNFTs';
import AuthContext from '../../../contexts/authContext';
import NFTPortfolioListItem from './game-portfolio-list-item/NFTPortfolioListItem';
import * as nftsAPI from "../../../api/nfts-api";
import Spinner from '../../common/Spinner';

const NFTPortfolio = () => {

    const { username } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [transactions, setTransactions] = useGetPortfolioNFTs(username, setLoading);

    const deleteTransactionItem = async (transactionId) => {
        await nftsAPI.nftSell(transactionId);

        setTransactions((currTransactions) => [...currTransactions].filter((transaction) => transaction._id !== transactionId));
    }

    return (
        <>
            {/* <section id="catalog-page">
                <h1>My Portfolio</h1>

                {transactions.length > 0
                    ? transactions.map((transactionItem) => (
                        <NFTPortfolioListItem
                            key={transactionItem._id}
                            {...transactionItem}
                            deleteTransactionItem={deleteTransactionItem}
                        />
                    ))
                    : <h3 className="no-articles">No NFTs yet</h3>
                }
            </section> */}

            <section className='bg-gray-50 dark:bg-gray-300 pt-20 pb-10 px-20'>
                <div className='container-xl lg:container m-auto'>
                    <h1 className="mb-10 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl dark:text-white">My NFT Collection</h1>

                    {loading ? (
                        <Spinner loading={loading} />
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center'>
                            {transactions.length > 0
                                ? transactions.map((transactionItem) => (
                                    <NFTPortfolioListItem
                                        key={transactionItem._id}
                                        {...transactionItem}
                                        deleteTransactionItem={deleteTransactionItem}
                                    />
                                ))
                                : <h3 className="no-articles">No NFTs yet</h3>
                            }
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default NFTPortfolio;