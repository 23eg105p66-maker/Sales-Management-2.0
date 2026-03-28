export function validateProduct(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Product name is required";
  if (values.price == null || values.price === "" || Number(values.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }
  if (values.quantity == null || values.quantity === "" || Number(values.quantity) < 0) {
    errors.quantity = "Quantity cannot be negative";
  }
  return errors;
}

export function validateCustomer(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Name is required";
  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format";
  }
  return errors;
}

export function validateSale(values, product) {
  const errors = {};
  if (!values.productId) errors.productId = "Product is required";
  if (!values.customerId) errors.customerId = "Customer is required";
  const qty = Number(values.quantity);
  if (!qty || qty <= 0) errors.quantity = "Quantity must be greater than 0";
  if (product && qty > product.quantity) {
    errors.quantity = "Quantity exceeds available stock";
  }
  if (!values.date) errors.date = "Date is required";
  return errors;
}
