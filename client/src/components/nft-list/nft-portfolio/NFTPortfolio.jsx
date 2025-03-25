import { useContext, useState } from 'react';
import { useGetPortfolioNFTs } from '../../../hooks/useNFTs';
import AuthContext from '../../../contexts/authContext';
import NFTPortfolioListItem from './nft-portfolio-list-item/NFTPortfolioListItem';
import * as nftsAPI from "../../../api/nfts-api";
import Spinner from '../../common/Spinner';

import { MdOutlineWarningAmber } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";
import { toast } from 'react-toastify';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const NFTPortfolio = () => {

    const { username } = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const [selling, setSelling] = useState({});

    const [transactions, setTransactions] = useGetPortfolioNFTs(username, setLoading);

    const [currentTransaction, setCurrentTransaction] = useState('');
    const [currentNft, setCurrentNft] = useState({});

    const deleteTransactionItem = async (transactionId, nft) => {
        setOpen(true);

        setCurrentTransaction(transactionId);

        setCurrentNft(nft);
    }

    const confirmSellHandler = async (confirmed) => {
        setOpen(false);

        if (confirmed) {
            setSelling((prev) => ({ ...prev, [currentTransaction]: true }));

            try {
                await nftsAPI.nftSell(currentTransaction);

                setTransactions((currTransactions) =>
                    [...currTransactions].filter((transaction) => transaction._id !== currentTransaction)
                );

                toast.success(`Successfully sold ${currentNft.title}!`);
            } catch (error) {
                toast.error('Failed to sell NFT. Please try again.');
            } finally {
                setSelling((prev) => ({ ...prev, [currentTransaction]: false }));
            }
        }
    };

    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <MdOutlineWarningAmber aria-hidden="true" className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-slate-900">
                                            Sell NFT
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-slate-500">
                                                Are you sure you want to sell <span className="font-bold">{currentNft.title}</span>?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" onClick={() => setOpen(false)}>
                                <button
                                    type="button"
                                    onClick={() => confirmSellHandler(true)}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Sell <MdRemoveShoppingCart className='ml-2' />
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => confirmSellHandler(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <section className='bg-gray-50 pt-20 pb-10 px-20'>
                <div className='container-xl mx-auto lg:container min-h-[100vh]'>
                    <h1 className="mb-10 text-slate-700 text-center text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-6xl">My NFT Collection</h1>

                    {loading ? (
                        <Spinner loading={loading} />
                    ) :
                        transactions.length > 0
                            ? (
                                <div id='my-portfolio' className='grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center'>
                                    {transactions.map((transactionItem) => (
                                        <NFTPortfolioListItem
                                            key={transactionItem._id}
                                            {...transactionItem}
                                            deleteTransactionItem={deleteTransactionItem}
                                            selling={!!selling[transactionItem._id]}
                                        />
                                    ))}
                                </div>
                            )
                            : (
                                <p className="text-slate-600 text-center text-lg font-normal lg:text-xl sm:px-16 xl:px-48 py-10">No NFTs in your collection</p>
                            )
                    }
                </div>
            </section>
        </>
    )
}

export default NFTPortfolio;