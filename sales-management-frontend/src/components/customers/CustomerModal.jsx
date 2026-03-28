import CustomerForm from "./CustomerForm";
import "../../styles/modal.css";

export function CustomerModal({ open, customer, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{customer ? "Edit customer" : "Add customer"}</div>
          <button className="btn-icon" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <CustomerForm
            initialValues={
              customer
                ? {
                    name: customer.name,
                    email: customer.email,
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

export default CustomerModal;
