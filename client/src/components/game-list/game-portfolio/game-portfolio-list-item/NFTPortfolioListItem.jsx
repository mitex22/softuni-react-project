import { Link } from 'react-router-dom'
import { pathToUrl } from '../../../../utils/pathUtils'
import PATH from '../../../../paths/paths'
import { useContext } from 'react'
import AuthContext from '../../../../contexts/authContext'

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
        <div className="allGames">
            <div className="allGames-info">
                <img src={nft.imageUrl} />
                <h6>{nft.category}</h6>
                <h2>{nft.title}</h2>
                <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId })} className="details-button">Details</Link>
            </div>

            {isAuthenticated && isNFTOwner && <button className="button" onClick={() => sellGameButtonClickHandler(transactionId)}>Sell NFT</button>}

        </div>
    )
}

export default NFTPortfolioListItem;