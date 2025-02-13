import React from 'react'
import { Link } from 'react-router-dom'
import PATH from '../../paths/paths';
import nftLogo from '../../assets/images/nft-logo.png';
import footerBg from '../../assets/images/footer-bg.jpg';
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import twitter from '../../assets/images/twitter.png';

import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer w-full pb-10 bg-gradient-to-r from-indigo-300 bg-center bg-cover bg-blend-overlay bg-fixed bg-white/80" style={{backgroundImage: `url(${footerBg})`}}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Link to={PATH.HOME} className="flex justify-center items-center border-gray-200 pt-10">
                        <img src={nftLogo} className="h-6 sm:h-9" alt="NFT Zoo Logo" />
                    </Link>

                    <div className="py-2 mb-2 border-b border-gray-200"></div>

                    <div className="flex space-x-10 justify-center items-center mb-10">
                        <a href="#" className="block text-slate-900 transition-all duration-500 hover:text-indigo-600">
                            <img src={twitter} className="p-1 border-b-2 border-b-transparent mr-3 h-6 sm:h-9 hover:border-b-indigo-300" alt="Twitter Logo" />
                        </a>
                        <a href="#" className="block text-slate-900 transition-all duration-500 hover:text-indigo-600">
                            <img src={instagram} className="p-1 border-b-2 border-b-transparent mr-3 h-6 sm:h-9 hover:border-b-indigo-300" alt="Instagram Logo" />
                        </a>
                        <a href="#" className="block text-slate-900 transition-all duration-500 hover:text-indigo-600">
                            <img src={facebook} className="p-1 border-b-2 border-b-transparent mr-3 h-6 sm:h-9 hover:border-b-indigo-300" alt="Facebook Logo" />
                        </a>
                    </div>
                    <span className="text-md text-slate-500 text-center block"><img src={nftLogo} className="h-6 sm:h-9 inline-block" alt="NFT Zoo Logo" /> by Dimitar Pavlov | 2025 | © All rights reserved.</span>
                </div>
            </div>
        </footer>

    )
}

export default Footer