import ProductForm from "./ProductForm";
import "../../styles/modal.css";

export function ProductModal({ open, product, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{product ? "Edit product" : "Add product"}</div>
          <button className="btn-icon" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <ProductForm
            initialValues={
              product
                ? {
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                  }
                : undefined
            }
            onSubmit={(payload) => {
              onSave(payload);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
