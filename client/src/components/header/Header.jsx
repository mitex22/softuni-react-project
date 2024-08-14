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
            ? 'text-indigo-700 block py-2 px-3 text-gray-900 hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-gray-700 lg:p-0'
            : 'block py-2 px-3 text-gray-900 hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-indigo-700 lg:p-0';

    return (
        <>
            <nav className="bg-indigo-200 border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-20 py-4">
                    <NavLink to={PATH.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={nftLogo} className="h-8" alt="NFT Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">NFT Zoo</span>
                    </NavLink>

                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    <div className="hidden w-full lg:block lg:w-auto" id="navbar-default">
                        {isAuthenticated && (
                            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0">
                                <li>
                                    <NavLink to={PATH.GAMES} className={linkClass}>All NFTs</NavLink>
                                </li>
                                <li>
                                    <NavLink to={PATH.GAME_CREATE} className={linkClass}>Create NFT</NavLink>
                                </li>
                                <li>
                                    <NavLink to={PATH.GAME_PORTFOLIO} className={linkClass}>My Portfolio</NavLink>
                                </li>
                                <li>
                                    <NavLink to={PATH.LOGOUT} className={linkClass}>Logout</NavLink>
                                </li>
                                <li>
                                    <span className='block py-2 px-3 text-indigo-500 rounded lg:border-0 lg:p-0'>| Welcome, {username}</span>
                                </li>
                            </ul>
                        )}

                        {!isAuthenticated && (
                            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0">
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
        </>
    )
}

export default Header