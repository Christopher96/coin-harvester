const { getCoins } = require("./coinmarketcap");
const { getConcat } = require("./4chan");
const { orderCoins } = require("./search");

(async () => {
    const coins = await getCoins(5000, true);
    const concat = await getConcat("biz", true);
    orderCoins(coins, concat);
})();
