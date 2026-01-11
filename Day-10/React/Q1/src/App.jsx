import { useState, useMemo } from "react";

const users = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "User", "Guest"][i % 3],
}));

export default function App() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const currentData = useMemo(
    () => users.slice(startIndex, endIndex),
    [startIndex, endIndex]
  );

  const pageNumbers = useMemo(() => {
    const groupSize = 5;
    const start = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    return Array.from(
      { length: Math.min(groupSize, totalPages - start + 1) },
      (_, i) => start + i
    );
  }, [currentPage, totalPages]);

  function changePage(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Client-Side Pagination</h2>

      <label>
        Page Size:
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </label>

      <p>
        Showing {startIndex + 1}-{endIndex} of {totalItems} results
      </p>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        {pageNumbers.map(num => (
          <button
            key={num}
            onClick={() => changePage(num)}
            style={{ fontWeight: num === currentPage ? "bold" : "normal" }}
          >
            {num}
          </button>
        ))}

        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={() => changePage(totalPages)} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </div>
  );
}
