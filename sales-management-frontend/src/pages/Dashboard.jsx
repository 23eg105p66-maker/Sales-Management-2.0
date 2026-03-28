import React from "react";
import "../styles/dashboard.css";
import { calculateTotals } from "../utils/calculateTotals";
import { formatCurrency } from "../utils/formatCurrency";
import StatCard from "../components/common/StatCard";
import EmptyState from "../components/common/EmptyState";
import { getProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";
import { getSales } from "../services/salesService";

export function Dashboard() {
  const [products, setProducts] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [sales, setSales] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsRes, customersRes, salesRes] = await Promise.all([
        getProducts(),
        getCustomers(),
        getSales(),
      ]);
      setProducts(productsRes.data);
      setCustomers(customersRes.data);
      setSales(salesRes.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const { totalProducts, totalCustomers, totalSalesCount, totalRevenue, lowStockProducts } =
    calculateTotals({
      products,
      customers,
      sales,
    });

  const recentSales = [...sales]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <div className="dashboard-cards">
        <StatCard label="Total products" value={totalProducts} />
        <StatCard label="Total customers" value={totalCustomers} />
        <StatCard label="Sales count" value={totalSalesCount} />
        <StatCard label="Revenue" value={totalRevenue} type="currency" />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="page-grid">
        <div className="table-card">
          <div className="section-header">
            <div>
              <div className="section-title">Low stock</div>
              <div className="section-subtitle">Products that may need restocking soon</div>
            </div>
          </div>
          {loading ? (
            <div className="loading">Loading dashboard...</div>
          ) : lowStockProducts.length ? (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No low stock products." />
          )}
        </div>

        <div className="table-card">
          <div className="section-header">
            <div>
              <div className="section-title">Recent sales</div>
              <div className="section-subtitle">Latest recorded transactions</div>
            </div>
          </div>
          {loading ? (
            <div className="loading">Loading dashboard...</div>
          ) : recentSales.length ? (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((s) => {
                    const product = products.find((p) => p.id === s.productId);
                    return (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{product?.name || "-"}</td>
                        <td>{s.quantity}</td>
                        <td>{formatCurrency(s.totalPrice)}</td>
                        <td>{s.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No recent sales." />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
