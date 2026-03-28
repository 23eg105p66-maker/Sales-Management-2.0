import EmptyState from "../common/EmptyState";
import { formatCurrency } from "../../utils/formatCurrency";

export function SalesTable({ sales, products, customers, searchTerm, onDelete }) {
  const term = searchTerm.toLowerCase();

  const rows = sales.map((s) => {
    const productId = s.productId ?? s.product?.id;
    const customerId = s.customerId ?? s.customer?.id;

    const product = products.find((p) => p.id === productId);
    const customer = customers.find((c) => c.id === customerId);
    return {
      ...s,
      productName: product?.name || "-",
      customerName: customer?.name || "-",
    };
  });

  const filtered = rows.filter((r) => {
    return (
      r.productName.toLowerCase().includes(term) ||
      r.customerName.toLowerCase().includes(term)
    );
  });

  if (!filtered.length) {
    return <EmptyState message="No sales found." />;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.productName}</td>
              <td>{s.customerName}</td>
              <td>{s.quantity}</td>
              <td>{formatCurrency(s.totalPrice)}</td>
              <td>{s.date}</td>
              <td>
                <button className="btn-icon" onClick={() => onDelete(s)}>
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

export default SalesTable;
