const tableData = [
  { name: 'John', age: 25, salary: 50000 },
  { name: 'Alice', age: 30, salary: 75000 },
  { name: 'Bob', age: 22, salary: 45000 },
  { name: 'Charlie', age: 35, salary: 90000 }
];

const tbody = document.getElementById("tableBody");
let sortState = {};

function renderTable(data) {
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.salary}</td>
    `;
    tbody.appendChild(tr);
  });
}

function sortTable(key) {
  const direction = sortState[key] === "asc" ? "desc" : "asc";
  sortState = { [key]: direction };

  tableData.sort((a, b) => {
    if (typeof a[key] === "number") {
      return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
    }
    return direction === "asc"
      ? a[key].localeCompare(b[key])
      : b[key].localeCompare(a[key]);
  });

  document.querySelectorAll("th span").forEach(span => span.textContent = "");
  document.getElementById(key).textContent = direction === "asc" ? "▲" : "▼";

  renderTable(tableData);
}

renderTable(tableData);
