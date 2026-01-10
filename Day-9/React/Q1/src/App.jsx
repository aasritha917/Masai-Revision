import { useState } from "react";

export default function App() {
  const [history, setHistory] = useState([""]);
  const [index, setIndex] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    const newHistory = history.slice(0, index + 1);
    newHistory.push(value);
    setHistory(newHistory);
    setIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (index > 0) setIndex(index - 1);
  };

  const redo = () => {
    if (index < history.length - 1) setIndex(index + 1);
  };

  return (
    <div>
      <h2>Undo / Redo Editor</h2>

      <textarea
        value={history[index]}
        onChange={handleChange}
        rows={5}
        cols={40}
      />

      <div>
        <button onClick={undo} disabled={index === 0}>Undo</button>
        <button onClick={redo} disabled={index === history.length - 1}>Redo</button>
      </div>

      <p>History: {index + 1}/{history.length}</p>
    </div>
  );
}
