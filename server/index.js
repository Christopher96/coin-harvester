const { getCoins } = require("./coinmarketcap");
const { getConcat } = require("./4chan");

(async () => {
  const coins = await getCoins(5000, true);
  const concat = await getConcat("biz", true);
  console.log(concat);
})();
