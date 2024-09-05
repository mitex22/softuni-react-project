const BASE_URL = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR';

export const getETHcurrentPrice = async () => {

    const response = await fetch(BASE_URL);

    const result = await response.json();

    return result;
};