import { useState } from "react";

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function getFactors(n) {
  const res = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) res.push(i);
  }
  return res;
}

export default function NumberAnalyzer() {
  const [num, setNum] = useState("");
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  let prime = false;
  let factors = [];
  let sum = 0;

  if (num) {
    prime = isPrime(Number(num));
    factors = getFactors(Number(num));
    sum = factors.reduce((a, b) => a + b, 0);
    setTimeout(() => setCount(c => c + 1), 0);
  }

  return (
    <div style={{
      background: theme === "light" ? "#fff" : "#222",
      color: theme === "light" ? "#000" : "#fff",
      padding: "10px"
    }}>
      <h2>Number Analyzer</h2>

      <input
        type="number"
        value={num}
        onChange={e => setNum(e.target.value)}
        placeholder="Enter number"
      />

      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>

      {num && (
        <>
          <p>Is Prime: {prime ? "Yes" : "No"}</p>
          <p>Factors: {factors.join(", ")}</p>
          <p>Sum of Factors: {sum}</p>
        </>
      )}

      <p>Calculation Count: {count}</p>
    </div>
  );
}
