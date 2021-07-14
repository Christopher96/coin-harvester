const { coinmarketcap } = require("./secret");

const { get } = require("./methods")({
  endpoint: "https://pro-api.coinmarketcap.com/",
  headers: {
    "X-CMC_PRO_API_KEY": coinmarketcap,
  },
});
