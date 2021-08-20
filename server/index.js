const express = require('express');

const reddit = require('./reddit');
const { getCoins } = require("./coinmarketcap");
const { getConcat } = require("./4chan");
const { orderCoins } = require("./search");

const app = express();
const router = express.Router();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || '3000';

router.use('/reddit', reddit.router);

app.use('/api', router);

app.listen(port, host);
app.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

process.on('SIGINT', () => {
    process.exit();
});

const fetchAll = async () => {
    const coins = await getCoins(5000, true);
    const concat = await getConcat("biz", true);
    orderCoins(coins, concat);
};

reddit.authenticate();

// fetchAll();
  
