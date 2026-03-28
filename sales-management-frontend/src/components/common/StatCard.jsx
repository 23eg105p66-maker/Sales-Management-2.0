import { formatCurrency } from "../../utils/formatCurrency";

export function StatCard({ label, value, type }) {
  const displayValue =
    type === "currency" ? formatCurrency(value) : value?.toLocaleString?.() ?? value;

  return (
    <div className="section-card" style={{ padding: "11px 12px 10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{label}</div>
        <div className="tag">Today</div>
      </div>
      <div style={{ fontSize: "1.05rem", fontWeight: 600 }}>{displayValue}</div>
    </div>
  );
}

export default StatCard;
