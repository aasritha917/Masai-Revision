import { useEffect, useState } from "react";

const initialStocks = [
  { symbol: 'AAPL', price: 178.50, name: 'Apple Inc.' },
  { symbol: 'GOOGL', price: 142.30, name: 'Alphabet Inc.' },
  { symbol: 'MSFT', price: 378.90, name: 'Microsoft Corp.' },
  { symbol: 'AMZN', price: 145.20, name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', price: 242.80, name: 'Tesla Inc.' }
];

export default function App() {
  const [stocks, setStocks] = useState(initialStocks);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => {
          const change = (Math.random() - 0.5).toFixed(2);
          const newPrice = +(stock.price + +change).toFixed(2);
          return { ...stock, prev: stock.price, price: newPrice };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Stock Ticker</h2>
      <button onClick={() => setRunning(prev => !prev)}>
        {running ? "Stop" : "Start"}
      </button>

      <ul>
        {stocks.map(stock => {
          const diff = stock.price - (stock.prev || stock.price);
          const color = diff > 0 ? "green" : diff < 0 ? "red" : "black";
          const percent = ((diff / stock.price) * 100).toFixed(2);

          return (
            <li key={stock.symbol} style={{ color }}>
              {stock.symbol}: ${stock.price}
              {diff !== 0 && ` (${percent}%)`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
