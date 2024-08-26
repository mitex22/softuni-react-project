import * as request from "./requester";

const BASE_URL = 'http://localhost:3030/data/nfts';

export const getAll = async () => {
    const result = await request.get(BASE_URL);

    const nfts = result;

    return nfts;
};

export const getPortfolio = async (username) => {
    const query = new URLSearchParams({
        where: `_ownerUsername="${username}"`,
        load: `nft=nftId:nfts`
    });

    const result = await request.get(`http://localhost:3030/data/portfolio?` + query);

    const nfts = result;

    return nfts;
};

// export const getOne = (nftId) => request.get(`${BASE_URL}/${nftId}`);

export const getOne = async (nftId) => {
    const query = new URLSearchParams({
        load: `author=_ownerId:users`
    });

    const result = await request.get(`${BASE_URL}/${nftId}` + '?' + query);

    const nft = result;

    return nft;
};

export const getLatest = async () => {
    const result = await request.get(`${BASE_URL}?sortBy=_createdOn%20desc&pageSize=3`);

    const nfts = result;

    return nfts;
}

export const nftCreate = async (nftData) => {
    const result = await request.post(BASE_URL, nftData);

    return result;
};

export const nftEdit = async (nftId, nftData) => {
    const result = await request.put(`${BASE_URL}/${nftId}`, nftData);

    return result;
};

export const nftBuy = async (nftId, _ownerId, _ownerUsername) => {
    const result = await request.post('http://localhost:3030/data/portfolio', { nftId, _ownerId, _ownerUsername });

    return result;
};

export const nftSell = async (transactionId) => request.del(`http://localhost:3030/data/portfolio/${transactionId}`)

export const nftDelete = async (nftId) => request.del(`${BASE_URL}/${nftId}`);