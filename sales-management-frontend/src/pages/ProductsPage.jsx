import React from "react";
import "../styles/products.css";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import ConfirmModal from "../components/common/ConfirmModal";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";

export function ProductsPage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [confirmTarget, setConfirmTarget] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to load products", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadProducts();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const showFeedback = (message, tone = "success") => {
    setFeedback({ message, tone });
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await updateProduct(editing.id, payload);
        showFeedback("Product updated.");
      } else {
        await createProduct(payload);
        showFeedback("Product added.");
      }
      setModalOpen(false);
      setEditing(null);
      await loadProducts();
    } catch (err) {
      console.error("Failed to save product", err);
      showFeedback("Failed to save product.", "error");
    }
  };

  const handleDelete = (product) => {
    setConfirmTarget(product);
  };

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    try {
      await deleteProduct(confirmTarget.id);
      showFeedback("Product deleted.");
      await loadProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
      showFeedback("Failed to delete product.", "error");
    } finally {
      setConfirmTarget(null);
    }
  };

  return (
    <div className="products-page">
      <PageHeader
        title="Products"
        subtitle="Manage inventory products"
        actionLabel="Add Product"
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
              <div className="section-title">Products</div>
              <div className="section-subtitle">Search and manage inventory</div>
            </div>
          </div>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
          />
        </div>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <ProductTable
            products={products}
            searchTerm={search}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ProductModal
        open={modalOpen}
        product={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmModal
        title="Delete product"
        message="Are you sure you want to delete this product?"
        open={!!confirmTarget}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
        confirmLabel="Delete"
      />
    </div>
  );
}

export default ProductsPage;
