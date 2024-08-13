import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthContext from '../../contexts/authContext';
import PATH from '../../paths/paths';
import logo from '../../assets/images/logo.png';

const Header = () => {

    const {
        isAuthenticated,
        username
    } = useContext(AuthContext);

    const linkClass = ({ isActive }) =>
        isActive
            ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

    return (
        <>
            <nav className='bg-indigo-700 border-b border-indigo-500'>
                <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                    <div className='flex h-20 items-center justify-between'>
                        <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                            <NavLink
                                className='flex flex-shrink-0 items-center mr-4'
                                to={PATH.HOME}>
                                <img className='h-10 w-auto' src={logo} alt='React Jobs' />
                                <span className='hidden md:block text-white text-2xl font-bold ml-2'>NFT Zoo</span>
                            </NavLink>
                            <div className='md:ml-auto'>
                                {isAuthenticated && (
                                    <div className='flex space-x-2'>
                                        <NavLink to={PATH.GAMES} className={linkClass}>All NFTs</NavLink>
                                        <NavLink to={PATH.GAME_CREATE} className={linkClass}>Create NFT</NavLink>
                                        <NavLink to={PATH.GAME_PORTFOLIO} className={linkClass}>My Portfolio</NavLink>
                                        <NavLink to={PATH.LOGOUT} className={linkClass}>Logout</NavLink>
                                        <span>| Welcome, {username}</span>
                                    </div>
                                )}

                                {!isAuthenticated && (
                                    <div className='flex space-x-2'>
                                        <NavLink to={PATH.LOGIN} className={linkClass}>Login</NavLink>
                                        <NavLink to={PATH.REGISTER} className={linkClass}>Register</NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header