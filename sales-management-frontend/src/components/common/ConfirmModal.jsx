import "../../styles/modal.css";

export function ConfirmModal({ open, title, message, confirmLabel, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title || "Confirm"}</div>
          <button className="btn-icon" onClick={onCancel}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmLabel || "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
