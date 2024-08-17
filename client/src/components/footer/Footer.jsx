import React from 'react'
import { Link } from 'react-router-dom'
import PATH from '../../paths/paths';
import nftLogo from '../../assets/images/nft-logo.png';
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import twitter from '../../assets/images/twitter.png';

const Footer = () => {
    return (
        <footer className="w-full py-10 bg-gray-50 dark:bg-gray-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Link to={PATH.HOME} className="flex justify-center items-center border-t border-gray-200 pt-10">
                        <img src={nftLogo} className="mr-3 h-6 sm:h-9" alt="NFT Zoo Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">NFT Zoo</span>
                    </Link>

                    <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-10 mb-10 border-b border-gray-200">
                        <li><a href="#" className="text-gray-800 hover:text-gray-900">Pagedone</a></li>
                        <li><a href="#" className=" text-gray-800 hover:text-gray-900">Products</a></li>
                        <li><a href="#" className=" text-gray-800 hover:text-gray-900">Resources</a></li>
                        <li><a href="#" className=" text-gray-800 hover:text-gray-900">Blogs</a></li>
                        <li><a href="#" className=" text-gray-800 hover:text-gray-900">Support</a></li>
                    </ul>
                    <div className="flex space-x-10 justify-center items-center mb-10">
                        <a href="#" className="block text-gray-900 transition-all duration-500 hover:text-indigo-600">
                            <img src={twitter} className="mr-3 h-6 sm:h-9" alt="NFT Zoo Logo" />
                        </a>
                        <a href="#" className="block text-gray-900 transition-all duration-500 hover:text-indigo-600">
                            <img src={instagram} className="mr-3 h-6 sm:h-9" alt="NFT Zoo Logo" />
                        </a>
                        <a href="#" className="block text-gray-900 transition-all duration-500 hover:text-indigo-600">
                            <img src={facebook} className="mr-3 h-6 sm:h-9" alt="NFT Zoo Logo" />
                        </a>
                    </div>
                    <span className="text-lg text-gray-500 text-center block">©<a href="https://pagedone.io/"> Dimitar Pavlov</a> | 2024 | All rights reserved.</span>
                </div>
            </div>
        </footer>

    )
}

export default Footer