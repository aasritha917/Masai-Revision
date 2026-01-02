import { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUser = () => {
    setLoading(true);
    setError("");

    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/users/1", {
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => {
        if (err.name !== "AbortError") {
          setError("Something went wrong");
        }
      })
      .finally(() => setLoading(false));

    return controller;
  };

  useEffect(() => {
    const controller = fetchUser();

    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <>
        <p>{error}</p>
        <button onClick={fetchUser}>Retry</button>
      </>
    );
  }

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;
