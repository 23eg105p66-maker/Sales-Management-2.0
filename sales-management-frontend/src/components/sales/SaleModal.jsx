import SaleForm from "./SaleForm";
import "../../styles/modal.css";

export function SaleModal({ open, onClose, onSave, products, customers }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Record sale</div>
          <button className="btn-icon" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <SaleForm
            products={products}
            customers={customers}
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

export default SaleModal;
