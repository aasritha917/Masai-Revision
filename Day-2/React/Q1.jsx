import { useEffect, useState } from "react";

function AutoSaveNotes() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Saved ✓");

  useEffect(() => {
    if (!text) return;

    setStatus("Saving...");

    const timer = setTimeout(() => {
      console.log("Saved note:", text);
      setStatus("Saved ✓");
    }, 2000);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write notes..."
      />
      <p>{status}</p>
    </div>
  );
}

export default AutoSaveNotes;
