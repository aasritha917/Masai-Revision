import { useEffect, useState } from "react";

export default function App() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {!online && (
        <div style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "#ff4d4d",
          color: "white",
          padding: 10,
          textAlign: "center",
          transition: "transform 0.3s"
        }}>
          ⚠️ You are offline
        </div>
      )}
      <div style={{ padding: 40 }}>
        <h2>Network Status App</h2>
        <p>Status: {online ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
}
