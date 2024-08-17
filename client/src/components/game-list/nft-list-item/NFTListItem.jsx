import { Link } from 'react-router-dom'
import { pathToUrl } from '../../../utils/pathUtils'
import PATH from '../../../paths/paths'
import { FaArrowRight } from 'react-icons/fa';

const NFTListItem = (
    {
        _id: nftId,
        title,
        category,
        imageUrl,
    }
) => {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId})}>
                    <img className="w-full" src={imageUrl} alt="Sunset in the mountains" />
                </Link>

                <div className="px-6 pt-4 pb-4">

                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>

                    <h6 className='mb-3'>{category}</h6>

                    <Link to={`/nfts/${nftId}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Details
                        <FaArrowRight className='ml-2' />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NFTListItem