import { useEffect, useState } from "react";
import UserSelect from "./components/UserSelect";
import PostsList from "./components/PostList";

export default function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoadingUsers(true);

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoadingUsers(false));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    setLoadingPosts(true);

    fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      { signal: controller.signal }
    )
      .then(res => res.json())
      .then(data => setPosts(data))
      .finally(() => setLoadingPosts(false));

    return () => controller.abort();
  }, [userId]);

  const sortedPosts = [...posts].sort((a, b) =>
    asc
      ? a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      : b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
  );

  return (
    <div className="container">
      <h1>User Posts Viewer</h1>

      <UserSelect
        users={users}
        value={userId}
        loading={loadingUsers}
        onChange={setUserId}
      />

      {userId && !loadingPosts && (
        <button onClick={() => setAsc(!asc)}>
          Sort: {asc ? "A → Z" : "Z → A"}
        </button>
      )}

      <PostsList
        posts={sortedPosts}
        loading={loadingPosts}
        userSelected={!!userId}
      />
    </div>
  );
}