import { validateCustomer } from "../../utils/validators";
import React from "react";

export function CustomerForm({ initialValues, onSubmit }) {
  const [values, setValues] = React.useState(
    initialValues || { name: "", email: "" }
  );
  const [errors, setErrors] = React.useState({});

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateCustomer(values);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
      };
      onSubmit?.(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-field">
        <label className="form-label">Name</label>
        <input
          className="form-input"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Rahul Sharma"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>
      <div className="form-field">
        <label className="form-label">Email</label>
        <input
          className="form-input"
          value={values.email}
          onChange={handleChange("email")}
          placeholder="rahul@example.com"
        />
        {errors.email && <div className="form-error">{errors.email}</div>}
      </div>
      <div className="form-field" style={{ alignSelf: "flex-end", textAlign: "right" }}>
        <button type="submit" className="btn btn-primary">
          Save customer
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;
