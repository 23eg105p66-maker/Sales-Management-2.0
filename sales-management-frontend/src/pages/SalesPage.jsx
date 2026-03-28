import React from "react";
import "../styles/sales.css";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import SalesTable from "../components/sales/SalesTable";
import SaleModal from "../components/sales/SaleModal";
import ConfirmModal from "../components/common/ConfirmModal";
import { getProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";
import { getSales, createSale, deleteSale } from "../services/salesService";

export function SalesPage() {
  const [products, setProducts] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [sales, setSales] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [confirmTarget, setConfirmTarget] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);

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
      console.error("Failed to load sales data", err);
      setError("Failed to load sales data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setModalOpen(true);
  };

  const showFeedback = (message, tone = "success") => {
    setFeedback({ message, tone });
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleSave = async (payload) => {
    try {
      await createSale(payload);
      showFeedback("Sale recorded.");
      setModalOpen(false);
      await loadData();
    } catch (err) {
      console.error("Failed to record sale", err);
      showFeedback("Failed to record sale.", "error");
    }
  };

  const handleDelete = (sale) => {
    setConfirmTarget(sale);
  };

  const confirmDelete = async () => {
    if (!confirmTarget) return;

    try {
      await deleteSale(confirmTarget.id);
      showFeedback("Sale deleted.");
      await loadData();
    } catch (err) {
      console.error("Failed to delete sale", err);
      showFeedback("Failed to delete sale.", "error");
    } finally {
      setConfirmTarget(null);
    }
  };

  return (
    <div className="sales-page">
      <PageHeader
        title="Sales"
        subtitle="Record and manage sales"
        actionLabel="Record Sale"
        onAction={openAdd}
      />

      {feedback && (
        <div className={`feedback ${feedback.tone}`}>{feedback.message}</div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="table-card">
        <div className="filters-row">
          <div className="section-header">
            <div>
              <div className="section-title">Sales</div>
              <div className="section-subtitle">Search and review sales records</div>
            </div>
          </div>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by product or customer..."
          />
        </div>
        {loading ? (
          <div className="loading">Loading sales...</div>
        ) : (
          <SalesTable
            sales={sales}
            products={products}
            customers={customers}
            searchTerm={search}
            onDelete={handleDelete}
          />
        )}
      </div>

      <SaleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        products={products}
        customers={customers}
      />

      <ConfirmModal
        title="Delete sale"
        message="Are you sure you want to delete this sale?"
        open={!!confirmTarget}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
        confirmLabel="Delete"
      />
    </div>
  );
}

export default SalesPage;
