const fetch = require("node-fetch");

const jsonToQuery = (json) => {
  return (
    "?" +
    Object.keys(json)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&")
  );
};

module.exports = function ({ endpoint, headers }) {
  const get = async (action, params = {}) => {
    const query = jsonToQuery(params);
    const url = endpoint + action + query;
    console.log(url);
    try {
      const response = await fetch(url, {
        headers,
      });
      return await response.json();
    } catch (e) {
      console.log("error", e);
    }
  };

  const post = async (action, data = {}) => {
    const url = endpoint + action;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });
    return await response.json();
  };

  return {
    get,
    post,
  };
};
