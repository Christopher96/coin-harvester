const { coinmarketcap } = require("./secret");
const { store, fetch } = require("./storage")("coins.data");
const { get } = require("./request")({
  endpoint: "https://pro-api.coinmarketcap.com/v1/",
  headers: {
    "X-CMC_PRO_API_KEY": coinmarketcap,
  },
});

const getCoins = async (limit, local = false) => {
  if (local) {
    const coins = await fetch();
    if (coins) {
      return JSON.parse(coins);
    }
  }

  const res = await get("cryptocurrency/map", {
    limit,
    aux: "",
  });

  const coins = res.data.map(({ name, symbol }) => ({ name, symbol }));

  store(JSON.stringify(coins));

  return coins;
};

module.exports = {
  getCoins,
};
