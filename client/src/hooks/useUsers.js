import { useEffect, useState } from "react";

import * as nftsAPI from "../api/nfts-api";

export function useGetAllPortfolioUsers(setLoading, filterOutUser) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await nftsAPI.getAllPortfolios();

                let usernamesArray = [];

                for (const portfolioNFT of result) {
                    let currentUsername = portfolioNFT._ownerUsername;
                    usernamesArray.push(currentUsername);
                }

                usernamesArray = Array.from(new Set(usernamesArray.filter((user) => (user !== filterOutUser))));

                setUsers(usernamesArray);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return [users, setUsers]
}
