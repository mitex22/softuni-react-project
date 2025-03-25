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
    deleteTransactionItem,
    selling
}) => {

    const { userId, isAuthenticated } = useContext(AuthContext);

    const nftId = nft._id;

    const isNFTOwner = userId === _ownerId;

    const sellBtnClass = () =>
        selling
            ? 'disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none cursor-not-allowed text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2'
            : 'bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 text-center inline-flex justify-center items-center gap-2 me-2';

    const sellNFTbuttonClickHandler = async (transactionId) => {
        try {
            await deleteTransactionItem(transactionId, nft);
        } catch (error) {
            console.error('Failed to sell NFT:', error);
        }
    };

    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId })}>
                    <img className="w-full" src={nft.imageUrl} alt={`${nft.title}'s pic`} />
                </Link>

                <div className="px-6 pt-4 pb-4">

                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">{nft.title}</h5>

                    <h6 className='mb-3 text-slate-900'>{nft.category}</h6>

                    <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId })} className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 text-center inline-flex justify-center items-center gap-2 me-2">
                        Details
                        <FaArrowRight className='ml-2' />
                    </Link>

                    {isAuthenticated
                        && isNFTOwner
                        && <button
                            className={sellBtnClass()}
                            onClick={() => sellNFTbuttonClickHandler(transactionId)}
                            disabled={selling}
                        >
                            {selling ? 'Processing...' : <><MdRemoveShoppingCart /> Sell NFT</>}
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default NFTPortfolioListItem;