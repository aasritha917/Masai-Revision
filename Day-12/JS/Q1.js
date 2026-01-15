const allItems = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));

const container = document.getElementById("list");
const loader = document.getElementById("loader");

let visibleCount = 10;
let loading = false;

function renderItems() {
  const fragment = document.createDocumentFragment();

  allItems.slice(0, visibleCount).forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<h4>${item.title}</h4><p>${item.description}</p>`;
    fragment.appendChild(div);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

function loadMore() {
  if (loading || visibleCount >= allItems.length) return;

  loading = true;
  loader.style.display = "block";

  setTimeout(() => {
    visibleCount += 10;
    renderItems();
    loader.style.display = "none";
    loading = false;
  }, 800);
}

window.addEventListener("scroll", () => {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (nearBottom) loadMore();
});

renderItems();
