import { useState } from "react";

const originalData = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, joinDate: '2020-03-15' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', salary: 75000, joinDate: '2021-07-22' },
  { id: 3, name: 'Carol White', department: 'Engineering', salary: 105000, joinDate: '2019-01-10' },
  { id: 4, name: 'David Brown', department: 'Sales', salary: 68000, joinDate: '2022-05-30' },
  { id: 5, name: 'Eve Davis', department: 'HR', salary: 72000, joinDate: '2020-11-12' }
];

export default function App() {
  const [data, setData] = useState(originalData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  function handleSort(key) {
    let direction = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = null;
    }

    if (!direction) {
      setData(originalData);
      setSortConfig({ key: null, direction: null });
      return;
    }

    const sorted = [...data].sort((a, b) => {
      if (key === "salary") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      if (key === "joinDate") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      return direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });

    setData(sorted);
    setSortConfig({ key, direction });
  }

  const indicator = (key) =>
    sortConfig.key === key
      ? sortConfig.direction === "asc"
        ? " ↑"
        : " ↓"
      : "";

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Table</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name{indicator("name")}</th>
            <th onClick={() => handleSort("department")}>Department{indicator("department")}</th>
            <th onClick={() => handleSort("salary")}>Salary{indicator("salary")}</th>
            <th onClick={() => handleSort("joinDate")}>Join Date{indicator("joinDate")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>${emp.salary}</td>
              <td>{emp.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}