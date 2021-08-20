const { reddit } = require("./secret");
const { store, fetch } = require("./storage")("reddit.data");
const oauth = require("./request")({
  endpoint: "https://www.reddit.com/api/v1",
});

const express = require('express');
const router = express.Router();

router.get('/callback', (req, res, next) => {
  console.log(req);
  return res.status(200).json("Hello");
});

let nonce = 0;
const generateNonce = () => {
  max = 9999999;
  min = 1000000;
  nonce = Math.floor(
    Math.random() * (max - min) + min
  )
  return nonce;
};

const getToken = () => {
  return oauth.get('/authorize', {
    client_id: reddit.client_id,
    response_type: "code",
    state: generateNonce(),
    redirect_uri: "http://127.0.0.1:3000/api/reddit/callback",
    duration: "temporary",
    scope: "modmail modposts"
  });
};

const authenticate = () => {
  getToken();
}


const getConversations = (subReddit) => {
  return get(`/api/mod/conversations`);
};

const getConcat = async (subReddit, local = false) => {
  if (local) {
    const buf = await fetch();
    if (buf) {
        return buf.toString();
    }
  }

  const pages = await getThreads(subReddit);
}

module.exports = {
  authenticate,
  router
};
