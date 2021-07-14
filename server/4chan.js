const { get } = require("./methods")({
  endpoint: "https://a.4cdn.org/",
});

const getThreads = (boardId) => {
  return get(`${boardId}/threads.json`);
};

const getPosts = (boardId, postId) => {
  return get(`${boardId}/thread/${postId}.json`);
};

const getConcat = async (boardId) => {
  const pages = await getThreads(boardId);
  let threadIds = [];
  const currentThreadIds = pages[0].threads.map((thread) => thread.no);
  threadIds = threadIds.concat(currentThreadIds);
  // pages.forEach((page) => {
  //   const currentThreadIds = page.threads.map((thread) => thread.no);
  //   threadIds = threadIds.concat(currentThreadIds);
  // });

  let concat = "";

  threadIds = threadIds.slice(3, 4);

  for (const threadId of threadIds) {
    const { posts } = await getPosts(boardId, threadId);
    const comments = posts.map((post) =>
      post.com
        ?.replace(/(<([^>]+)>)/gi, "")
        .replace(/&gt;?\d*/gi, "")
        .replace(/&\w+;/gi, "")
        .replace(/&#039;/gi, "")
    );
    concat = concat.concat(comments);
  }

  return concat;
};

module.exports = {
  getConcat,
};
