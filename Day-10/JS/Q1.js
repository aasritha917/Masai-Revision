const items = [
  { id: 1, name: 'MacBook Pro', category: 'Electronics' },
  { id: 2, name: 'Nike Shoes', category: 'Footwear' },
  { id: 3, name: 'iPhone 15', category: 'Electronics' },
  { id: 4, name: 'Adidas Jacket', category: 'Clothing' },
  { id: 5, name: 'Sony Headphones', category: 'Electronics' }
];

const searchInput = document.getElementById("searchInput");
const list = document.getElementById("itemList");
const countText = document.getElementById("count");

function highlight(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, `<mark>$1</mark>`);
}

function renderList(data, keyword = "") {
  list.innerHTML = "";
  countText.textContent = `Items found: ${data.length}`;

  data.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${highlight(item.name, keyword)} - 
      ${highlight(item.category, keyword)}
    `;
    list.appendChild(li);
  });
}

renderList(items);

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(value) ||
    item.category.toLowerCase().includes(value)
  );

  renderList(filteredItems, value);
});
