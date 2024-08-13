import { useEffect, useState } from "react";

import * as nftsAPI from "../api/nfts-api";

export function useGetAllGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await nftsAPI.getAll();

            setGames(result);
        })();
    }, []);

    return [games, setGames]
}

export function useGetOneGame(gameId) {
    const [game, setGame] = useState({});

    useEffect(() => {
        (async () => {
            const result = await nftsAPI.getOne(gameId);

            setGame(result);
        })();
    }, [gameId]);

    return [game, setGame]
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