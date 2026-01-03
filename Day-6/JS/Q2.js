async function fetchUsersWithPostCount() {
  const [usersRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts")
  ]);

  const users = await usersRes.json();
  const posts = await postsRes.json();

  const result = users.map(user => {
    const postCount = posts.filter(
      post => post.userId === user.id
    ).length;

    return {
      userId: user.id,
      name: user.name,
      postCount: postCount
    };
  });

  console.log(result);
}

fetchUsersWithPostCount();
