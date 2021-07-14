const { store, fetch } = require("./storage")("4chan.data");
const { get } = require("./request")({
  endpoint: "https://a.4cdn.org/",
});

const getThreads = (boardId) => {
  return get(`${boardId}/threads.json`);
};

const getPosts = (boardId, postId) => {
  return get(`${boardId}/thread/${postId}.json`);
};

const getConcat = async (boardId, local = false) => {
  if (local) {
    const buf = await fetch();
    if (buf) {
      return buf.toString();
    }
  }

  const pages = await getThreads(boardId);
  let threadIds = [];

  pages.forEach((page) => {
    const currentThreadIds = page.threads.map((thread) => thread.no);
    threadIds = threadIds.concat(currentThreadIds);
  });

  let concat = "";

  for (const threadId of threadIds) {
    const { posts } = await getPosts(boardId, threadId);
    const comments = posts.map((post) =>
      post.com
        ?.replace(/(<([^>]+)>)/gi, "")
        .replace(/&gt;?\d*/gi, "")
        .replace(/&\w+;/gi, " ")
        .replace(/&#039;/gi, "")
    );
    concat = concat.concat(comments);
  }

  store(concat);

  return concat;
};

module.exports = {
  getConcat,
};
