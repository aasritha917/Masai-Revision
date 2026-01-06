async function fetchUserPostCommentData() {
  try {
    const userRes = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!userRes.ok) throw new Error("User fetch failed");
    const user = await userRes.json();

    const postsRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    if (!postsRes.ok) throw new Error("Posts fetch failed");
    const posts = await postsRes.json();

    const firstPost = posts[0];

    const commentsRes = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${firstPost.id}`
    );
    if (!commentsRes.ok) throw new Error("Comments fetch failed");
    const comments = await commentsRes.json();

    const result = {
      userName: user.name,
      firstPostTitle: firstPost.title,
      commentCount: comments.length,
      topComment: comments[0]?.body || "No comments"
    };

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchUserPostCommentData();
