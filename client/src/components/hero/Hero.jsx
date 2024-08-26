import React from 'react'
import { FaArrowRight } from 'react-icons/fa';

import nftHero from '../../assets/images/nft-hero.png';
import nftBg from '../../assets/images/nft-bg.jpg';

const Hero = () => {
    return (
        <>
            <section className="mt-14 bg-center bg-cover bg-blend-overlay bg-fixed bg-black/70" style={{backgroundImage: `url(${nftBg})`}}>
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto md:px-14 lg:gap-8 xl:gap-0 lg:px-20 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-slate-100 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl">Unlock Unique Digital Assets with NFT Cards</h1>
                        <p className="max-w-2xl mb-6 font-light text-slate-300 lg:mb-8 md:text-lg lg:text-xl">Explore, collect, and trade one-of-a-kind digital cards, each with its own rarity and value. Start building your portfolio today and own a piece of the digital revolution.</p>
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800">
                            Get started
                            <FaArrowRight className='ml-2' />
                        </a>
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700">
                            Speak to Sales
                        </a>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={nftHero} alt="Punk Monkey" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero