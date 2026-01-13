const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 299 }
];

const productList = document.getElementById("products");
const cartList = document.getElementById("cart");
const summary = document.getElementById("summary");

let cart = {}; 

function renderProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${product.name} - $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  cart[id] = cart[id] ? { ...cart[id], qty: cart[id].qty + 1 } 
                     : { ...products.find(p => p.id === id), qty: 1 };
  renderCart();
}

function updateQty(id, change) {
  cart[id].qty += change;
  if (cart[id].qty <= 0) delete cart[id];
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";

  let subtotal = 0;

  Object.values(cart).forEach(item => {
    subtotal += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} ($${item.price}) 
      <button onclick="updateQty(${item.id}, -1)">-</button>
      ${item.qty}
      <button onclick="updateQty(${item.id}, 1)">+</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    `;
    cartList.appendChild(li);
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  summary.innerHTML = `
    Subtotal: $${subtotal.toFixed(2)} <br>
    Tax (10%): $${tax.toFixed(2)} <br>
    <b>Total: $${total.toFixed(2)}</b>
  `;
}

renderProducts();
