import { useEffect, useState } from "react";

import * as nftsAPI from "../api/nfts-api";
import PATH from "../paths/paths";
import { useNavigate } from "react-router-dom";


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

export function useGetOneNFT(nftId, setLoading) {
    const [nft, setNFT] = useState({});
    
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await nftsAPI.getOne(nftId);

                setNFT(result);
            } catch (error) {
                navigate("/not-found");
            } finally {
                setLoading(false);
            }
        })();
    }, [nftId]);

    return [nft, setNFT]
}

export function useGetPortfolioNFTs(username, setLoading) {
    const [nfts, setNFTs] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await nftsAPI.getPortfolio(username);

                if (!result) {
                    navigate(PATH.NOT_FOUND);
                } else {
                    setNFTs(result);
                }
            } catch (error) {
                navigate("/not-found");
            } finally {
                setLoading(false);
            }
        })();
    }, [username]);

    return [nfts, setNFTs]
}