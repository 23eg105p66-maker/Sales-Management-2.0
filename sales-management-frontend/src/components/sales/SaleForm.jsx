import React from "react";
import { validateSale } from "../../utils/validators";

export function SaleForm({ initialValues, products, customers, onSubmit }) {
  const [values, setValues] = React.useState(
    initialValues || { productId: "", customerId: "", quantity: "", date: "" }
  );
  const [errors, setErrors] = React.useState({});

  const selectedProduct = products.find((p) => p.id === Number(values.productId));
  const unitPrice = selectedProduct?.price || 0;
  const quantity = Number(values.quantity) || 0;
  const totalPrice = unitPrice * quantity;

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateSale(values, selectedProduct);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      const payload = {
        productId: Number(values.productId),
        customerId: Number(values.customerId),
        quantity: Number(values.quantity),
        totalPrice,
        date: values.date,
      };
      onSubmit?.(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-field">
        <label className="form-label">Product</label>
        <select
          className="form-select"
          value={values.productId}
          onChange={handleChange("productId")}
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.productId && <div className="form-error">{errors.productId}</div>}
      </div>
      <div className="form-field">
        <label className="form-label">Customer</label>
        <select
          className="form-select"
          value={values.customerId}
          onChange={handleChange("customerId")}
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.customerId && <div className="form-error">{errors.customerId}</div>}
      </div>
      <div className="form-field">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-input"
          value={values.quantity}
          onChange={handleChange("quantity")}
          placeholder="1"
        />
        {errors.quantity && <div className="form-error">{errors.quantity}</div>}
      </div>
      <div className="form-field">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-input"
          value={values.date}
          onChange={handleChange("date")}
        />
        {errors.date && <div className="form-error">{errors.date}</div>}
      </div>
      <div className="form-field">
        <label className="form-label">Total price</label>
        <div className="chip">{totalPrice || 0}</div>
      </div>
      <div className="form-field" style={{ alignSelf: "flex-end", textAlign: "right" }}>
        <button type="submit" className="btn btn-primary">
          Record sale
        </button>
      </div>
    </form>
  );
}

export default SaleForm;
