import "../../styles/layout.css";

export function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="page-header">
      <div className="page-header-main">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actionLabel && (
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={onAction}>
            + {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export default PageHeader;
