import { useEffect, useState } from "react";

const productsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Food", "Books"][i % 4],
  price: (Math.random() * 100 + 10).toFixed(2)
}));

export default function LiveSearch() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(productsData);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);

    const timer = setTimeout(() => {
      const result = productsData.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      setFiltered(result);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <h2>Live Product Search</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {searching && <p>Searching...</p>}

      <ul>
        {filtered.map(product => (
          <li key={product.id}>
            {product.name} | {product.category} | ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
