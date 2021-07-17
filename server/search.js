const findOccurences = (needle, haystack) => {
    const pattern = new RegExp(needle, 'gi');
    return (haystack.match(pattern) || []).length;
}

const sortCoins = (a, b) => {
    if (a.occurences < b.occurences) return -1;
    if (a.occurences > b.occurences) return 1;
    return 0;
}

const orderCoins = (coins, haystack) => {
    coins = coins.slice(0, 100);
    coins.forEach(coin => {
        coin.occurences = findOccurences(coin.name, haystack) + findOccurences(coin.symbol, haystack);
    });
    coins.sort(sortCoins);
    console.log(coins);
}

module.exports = {
    orderCoins
}
