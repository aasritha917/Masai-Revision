import { useEffect, useState } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          alert("Time's Up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  function start(minutes, seconds) {
    setTime(minutes * 60 + seconds);
    setRunning(true);
  }

  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <div style={{ padding: 20 }}>
      <h2>Countdown Timer</h2>

      <p>{mm}:{ss}</p>

      <button onClick={() => start(1, 30)}>Start 1:30</button>
      <button onClick={() => setRunning(prev => !prev)}>
        {running ? "Pause" : "Resume"}
      </button>
      <button onClick={() => { setRunning(false); setTime(0); }}>
        Reset
      </button>
    </div>
  );
}
