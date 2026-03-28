import EmptyState from "../common/EmptyState";

export function CustomerTable({ customers, searchTerm, onEdit, onDelete }) {
  const filtered = customers.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
    );
  });

  if (!filtered.length) {
    return <EmptyState message="No customers found." />;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>
                <button className="btn-icon" onClick={() => onEdit(c)}>
                  ✎
                </button>{" "}
                <button className="btn-icon" onClick={() => onDelete(c)}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
