import { useState } from "react";

const allPosts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  author: `Author ${(i % 10) + 1}`,
  content: `This is post number ${i + 1}`,
  likes: Math.floor(Math.random() * 500),
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
}));

export default function App() {
  const PAGE_SIZE = 20;

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  function loadMore() {
    setLoading(true);

    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + PAGE_SIZE, allPosts.length));
      setLoading(false);
    }, 800);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Infinite Scroll Feed</h2>

      {visiblePosts.map(post => (
        <div key={post.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 10 }}>
          <h4>{post.author}</h4>
          <p>{post.content}</p>
          <small>❤️ {post.likes} | {new Date(post.timestamp).toLocaleString()}</small>
        </div>
      ))}

      {loading && <p>Loading...</p>}

      {!loading && hasMore && (
        <button onClick={loadMore}>Load More</button>
      )}

      {!hasMore && <p>No more posts</p>}
    </div>
  );
}
