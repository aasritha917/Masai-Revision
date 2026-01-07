async function fetchPostsWithComments() {
  try {
    const [postsRes, commentsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/comments")
    ]);

    const posts = await postsRes.json();
    const comments = await commentsRes.json();

    if (!Array.isArray(comments)) {
      throw new Error("Comments API did not return an array");
    }

    const commentMap = comments.reduce((acc, c) => {
      if (!acc[c.postId]) acc[c.postId] = [];
      acc[c.postId].push(c);
      return acc;
    }, {});

    return posts
      .map(post => {
        const postComments = commentMap[post.id] || [];
        return {
          postId: post.id,
          title: post.title,
          commentCount: postComments.length,
          firstCommenterEmail: postComments[0]?.email || null
        };
      })
      .filter(p => p.commentCount > 0)
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 5);

  } catch (err) {
    console.error(err.message);
    return [];
  }
}
fetchPostsWithComments().then(result => console.log(result));