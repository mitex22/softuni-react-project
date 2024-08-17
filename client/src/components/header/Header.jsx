import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../contexts/authContext';
import PATH from '../../paths/paths';
import nftLogo from '../../assets/images/nft-logo.png';

const Header = () => {

    const {
        isAuthenticated,
        username
    } = useContext(AuthContext);

    const linkClass = ({ isActive }) =>
        isActive
            ? 'block py-2 pr-4 pl-3 text-blue-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 font-bold'
            : 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 font-bold';

    return (
        <>
            <header className='relative'>
                <nav className="fixed top-0 left-0 right-0 bg-white shadow sm:shadow-none sm:fixed z-10 border-gray-900 px-5 md:px-14 lg:px-20 py-2.5">
                    <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
                        <NavLink to={PATH.HOME} className="flex items-center">
                            <img src={nftLogo} className="mr-3 h-6 sm:h-9" alt="NFT Zoo Logo" />
                            <span className="self-center text-xl text-gray-700 font-extrabold whitespace-nowrap">NFT Zoo</span>
                        </NavLink>
                        <div className="flex items-center">
                            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            {/* User */}
                            {isAuthenticated && (
                                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                                    <li>
                                        <NavLink to={PATH.NFTs} className={linkClass}>All NFTs</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATH.GAME_CREATE} className={linkClass}>Create NFT</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATH.NFT_PORTFOLIO} className={linkClass}>My Portfolio</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATH.LOGOUT} className={linkClass}>Log Out</NavLink>
                                    </li>
                                    <li>
                                        <span className='block py-2 px-3 text-indigo-500 rounded lg:border-0 lg:p-0'><span className='pr-4'>|</span>Welcome, {username}</span>
                                    </li>
                                </ul>
                            )}

                            {/* Guest */}
                            {!isAuthenticated && (
                                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                    <li>
                                        <NavLink to={PATH.LOGIN} className={linkClass}>Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATH.REGISTER} className={linkClass}>Register</NavLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header