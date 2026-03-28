export function NotFound() {
  return (
    <div style={{ paddingTop: 40, textAlign: "center" }}>
      <div className="section-card" style={{ display: "inline-block", padding: 20 }}>
        <h1 style={{ fontSize: "1.1rem", marginBottom: 8 }}>Page not found</h1>
        <p style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
