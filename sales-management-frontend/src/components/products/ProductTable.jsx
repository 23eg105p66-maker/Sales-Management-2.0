import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "../common/EmptyState";

function stockStatus(quantity) {
  if (quantity === 0) return { label: "Out of stock", tone: "danger" };
  if (quantity <= 10) return { label: "Low stock", tone: "warning" };
  return { label: "In stock", tone: "success" };
}

export function ProductTable({ products, searchTerm, onEdit, onDelete }) {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filtered.length) {
    return <EmptyState message="No products found." />;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Stock status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => {
            const s = stockStatus(p.quantity);
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{formatCurrency(p.price)}</td>
                <td>{p.quantity}</td>
                <td>
                  <span className={`badge ${s.tone}`}>
                    <span className="status-dot" style={{ background: "currentColor" }} />
                    {s.label}
                  </span>
                </td>
                <td>
                  <button className="btn-icon" onClick={() => onEdit(p)}>
                    ✎
                  </button>{" "}
                  <button className="btn-icon" onClick={() => onDelete(p)}>
                    🗑
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
