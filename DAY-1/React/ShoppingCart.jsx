import { useState } from "react";

function ShoppingCart() {
  const [quantity, setQuantity] = useState(1);
  const price = 29.99;

  const total = quantity * price;
  const discount = quantity >= 5 ? total * 0.1 : 0;
  const finalTotal = total - discount;

  return (
    <div>
      <h2>Product</h2>
      <p>Price: ${price}</p>

      <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
        -
      </button>

      <span> {quantity} </span>

      <button onClick={() => setQuantity(quantity + 1)}>+</button>

      {quantity >= 5 && <p>🎉 10% Bulk Discount Applied!</p>}

      <p>Total: ${finalTotal.toFixed(2)}</p>
    </div>
  );
}

export default ShoppingCart;
