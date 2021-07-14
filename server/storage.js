const fs = require("fs");

module.exports = function (fileName) {
  const storePath = `./server/storage/${fileName}`;

  const store = async (data) => {
    try {
      await fs.promises.writeFile(storePath, data);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const fetch = async () => {
    try {
      return await fs.promises.readFile(storePath);
    } catch (err) {
      return false;
    }
  };

  return {
    store,
    fetch,
  };
};
