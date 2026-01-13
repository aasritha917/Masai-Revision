import { useState, useMemo } from "react";

const products = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
  price: Math.floor(Math.random() * 200) + 20,
  inStock: Math.random() > 0.3
}));

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  }

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (minPrice && p.price < minPrice) return false;
      if (maxPrice && p.price > maxPrice) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });
  }, [selectedCategories, minPrice, maxPrice, inStockOnly]);

  function clearFilters() {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Filter</h2>

      <div>
        <strong>Category:</strong>
        {['Electronics', 'Clothing', 'Books', 'Home'].map(cat => (
          <label key={cat} style={{ marginLeft: 10 }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <div>
        Price:
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={e => setInStockOnly(e.target.checked)}
        />
        In Stock Only
      </label>

      <div>
        <button onClick={clearFilters}>Clear All Filters</button>
      </div>

      <p>Showing {filteredProducts.length} results</p>

      <ul>
        {filteredProducts.map(p => (
          <li key={p.id}>
            {p.name} | {p.category} | ${p.price} | {p.inStock ? "In Stock" : "Out of Stock"}
          </li>
        ))}
      </ul>
    </div>
  );
}
