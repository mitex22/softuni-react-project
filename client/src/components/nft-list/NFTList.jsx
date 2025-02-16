import NFTListItem from "./nft-list-item/NFTListItem";
import { useGetAllNFTs } from "../../hooks/useNFTs";
import Spinner from "../common/Spinner";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NFTList = () => {
    const [loading, setLoading] = useState(true);
    const [nfts] = useGetAllNFTs(setLoading);

    // Search, Pagination, and Sorting States
    const [searchTerm, setSearchTerm] = useState(""); // To track user input for search
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(""); // For category sorting
    const itemsPerPage = 3;

    // Filter NFTs based on the search term
    const filteredNFTs = nfts.filter((nft) =>
        nft.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort NFTs by category if selected
    const sortedNFTs = selectedCategory
        ? filteredNFTs.filter((nft) => nft.category === selectedCategory)
        : filteredNFTs;

    // Calculate paginated NFTs
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNFTs = sortedNFTs.slice(startIndex, endIndex);

    // Total pages for filtered results
    const totalPages = Math.ceil(sortedNFTs.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when search term changes
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset to the first page when category changes
    };

    // Get unique categories for the dropdown (optional based on the data)
    const categories = Array.from(new Set(nfts.map((nft) => nft.category)));

    return (
        <>
            <section className="bg-gray-50 pt-20 pb-12 px-20">
                <div className="container-xl lg:container m-auto">
                    <h1 className="mb-4 text-slate-700 text-center text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-6xl">
                        All NFTs
                    </h1>

                    <p className="mb-6 text-slate-600 text-center text-lg font-normallg:text-xl sm:px-16 xl:px-48">
                        Discover and Collect Exclusive NFTs
                    </p>

                    <div className="mb-6 flex justify-center">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded w-1/4"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <input
                            type="text"
                            placeholder="Search by NFT title..."
                            className="px-4 py-2 border border-gray-300 rounded w-1/2"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {loading ? (
                        <Spinner loading={loading} />
                    ) : sortedNFTs.length > 0 ? (
                        <>
                            <div id="all-nfts" className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                                {paginatedNFTs.map((nft) => (
                                    <NFTListItem key={nft._id} {...nft} />
                                ))}
                            </div>

                            <div className="flex justify-center mt-6 space-x-4">
                                <button
                                    id="prev-btn"
                                    className={`px-4 py-2 bg-gray-300 rounded ${
                                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                >
                                    <FaArrowLeft />
                                </button>
                                <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                                <button
                                    id="next-btn"
                                    className={`px-4 py-2 bg-gray-300 rounded ${
                                        currentPage === totalPages
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="mb-6 text-slate-600 text-center text-lg font-normal lg:text-xl sm:px-16 xl:px-48 py-6">
                            No NFTs match your search.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default NFTList;
