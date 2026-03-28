import React from "react";
import "../styles/customers.css";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerModal from "../components/customers/CustomerModal";
import ConfirmModal from "../components/common/ConfirmModal";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../services/customerService";

export function CustomersPage() {
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [confirmTarget, setConfirmTarget] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (err) {
      console.error("Failed to load customers", err);
      setError("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadCustomers();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (customer) => {
    setEditing(customer);
    setModalOpen(true);
  };

  const showFeedback = (message, tone = "success") => {
    setFeedback({ message, tone });
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await updateCustomer(editing.id, payload);
        showFeedback("Customer updated.");
      } else {
        await createCustomer(payload);
        showFeedback("Customer added.");
      }
      setModalOpen(false);
      setEditing(null);
      await loadCustomers();
    } catch (err) {
      console.error("Failed to save customer", err);
      showFeedback("Failed to save customer.", "error");
    }
  };

  const handleDelete = (customer) => {
    setConfirmTarget(customer);
  };

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    try {
      await deleteCustomer(confirmTarget.id);
      showFeedback("Customer deleted.");
      await loadCustomers();
    } catch (err) {
      console.error("Failed to delete customer", err);
      showFeedback("Failed to delete customer.", "error");
    } finally {
      setConfirmTarget(null);
    }
  };

  return (
    <div className="customers-page">
      <PageHeader
        title="Customers"
        subtitle="Manage customer records"
        actionLabel="Add Customer"
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
              <div className="section-title">Customers</div>
              <div className="section-subtitle">Search and manage customers</div>
            </div>
          </div>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search customers..."
          />
        </div>
        {loading ? (
          <div className="loading">Loading customers...</div>
        ) : (
          <CustomerTable
            customers={customers}
            searchTerm={search}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <CustomerModal
        open={modalOpen}
        customer={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmModal
        title="Delete customer"
        message="Are you sure you want to delete this customer?"
        open={!!confirmTarget}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
        confirmLabel="Delete"
      />
    </div>
  );
}

export default CustomersPage;
