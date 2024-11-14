import { Link } from 'react-router-dom'
import { pathToUrl } from '../../../utils/pathUtils'
import PATH from '../../../paths/paths'
import { FaArrowRight } from 'react-icons/fa';

const UserListItem = ({
    userName,
}) => {

    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 pt-4 pb-4">

                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">{userName}'s Portfolio</h5>

                    {/* <Link to={pathToUrl(PATH.NFT_DETAILS, { nftId })} className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2">
                        Details
                        <FaArrowRight className='ml-2' />
                    </Link> */}
                    <Link to={pathToUrl(PATH.USER_PORTFOLIO, { userName })} className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block text-center inline-flex justify-center items-center gap-2 me-2">
                        Browse Portfolio
                        <FaArrowRight className='ml-2' />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default UserListItem;