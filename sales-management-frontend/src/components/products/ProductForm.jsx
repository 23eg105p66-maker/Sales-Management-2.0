import { validateProduct } from "../../utils/validators";
import React from "react";

export function ProductForm({ initialValues, onSubmit }) {
  const [values, setValues] = React.useState(
    initialValues || { name: "", price: "", quantity: "" }
  );
  const [errors, setErrors] = React.useState({});

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateProduct(values);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      const payload = {
        name: values.name.trim(),
        price: Number(values.price),
        quantity: Number(values.quantity),
      };
      onSubmit?.(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-field">
        <label className="form-label">Product name</label>
        <input
          className="form-input"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Laptop"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>
      <div className="form-field">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-input"
          value={values.price}
          onChange={handleChange("price")}
          placeholder="50000"
        />
        {errors.price && <div className="form-error">{errors.price}</div>}
      </div>
      <div className="form-field">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-input"
          value={values.quantity}
          onChange={handleChange("quantity")}
          placeholder="10"
        />
        {errors.quantity && <div className="form-error">{errors.quantity}</div>}
      </div>
      <div className="form-field" style={{ alignSelf: "flex-end", textAlign: "right" }}>
        <button type="submit" className="btn btn-primary">
          Save product
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
