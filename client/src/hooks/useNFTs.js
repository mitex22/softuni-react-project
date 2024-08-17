import { useEffect, useState } from "react";

import * as nftsAPI from "../api/nfts-api";

export function useGetAllNFTs(setLoading) {
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await nftsAPI.getAll();

                setNFTs(result);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return [nfts, setNFTs]
}

export function useGetOneNFT(nftId) {
    const [nft, setNFT] = useState({});

    useEffect(() => {
        (async () => {
            const result = await nftsAPI.getOne(nftId);

            setNFT(result);
        })();
    }, [nftId]);

    return [nft, setNFT]
}

export function useGetPortfolioGames(username) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await nftsAPI.getPortfolio(username);

            setGames(result);
        })();
    }, [username]);

    return [games, setGames]
}