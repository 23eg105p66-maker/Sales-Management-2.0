export function EmptyState({ message }) {
  return <div className="empty-state">{message || "No records yet."}</div>;
}

export default EmptyState;
