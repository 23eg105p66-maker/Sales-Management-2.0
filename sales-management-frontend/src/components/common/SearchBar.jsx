export function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      className="form-input"
      style={{ minWidth: 0, width: "220px" }}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search"}
    />
  );
}

export default SearchBar;
