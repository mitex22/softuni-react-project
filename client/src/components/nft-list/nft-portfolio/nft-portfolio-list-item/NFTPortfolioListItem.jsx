import { Link } from 'react-router-dom'
import { pathToUrl } from '../../../../utils/pathUtils'
import PATH from '../../../../paths/paths'
import { useContext } from 'react'
import AuthContext from '../../../../contexts/authContext'
import { FaArrowRight } from 'react-icons/fa';
import { MdRemoveShoppingCart } from "react-icons/md";

const NFTPortfolioListItem = ({
    nft,
    _id: transactionId,
    _ownerId,
    deleteTransactionItem
}) => {

    const { userId, isAuthenticated } = useContext(AuthContext);

    const nftId = nft._id;

    const isNFTOwner = userId === _ownerId;

    const sellGameButtonClickHandler = async (transactionId) => {
        const hasConfirmed = confirm(`Are you sure you want to sell ${nft.title}?`);

        if (hasConfirmed) {
            deleteTransactionItem(transactionId);
        }
    }

    return (
        <>
            {/* <div className="allGames">
                <div className="allGames-info">
                    <img src={nft.imageUrl} />
                    <h6>{nft.category}</h6>
                    <h2>{nft.title}</h2>
                    <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId })} className="details-button">Details</Link>
                </div>

                {isAuthenticated && isNFTOwner && <button className="button" onClick={() => sellGameButtonClickHandler(transactionId)}>Sell NFT</button>}
            </div> */}

            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId})}>
                    <img className="w-full" src={nft.imageUrl} alt="Sunset in the mountains" />
                </Link>

                <div className="px-6 pt-4 pb-4">

                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">{nft.title}</h5>

                    <h6 className='mb-3 text-gray-900'>{nft.category}</h6>

                    <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId })} className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2">
                        Details
                        <FaArrowRight className='ml-2' />
                    </Link>

                    {isAuthenticated 
                        && isNFTOwner 
                        && <button 
                                className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2'
                                onClick={() => sellGameButtonClickHandler(transactionId)}
                            ><MdRemoveShoppingCart />Sell NFT
                            </button>
                    }
                </div>
            </div>
        </>
    )
}

export default NFTPortfolioListItem;