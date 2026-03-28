export function calculateTotals({ products, customers, sales }) {
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const totalSalesCount = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalPrice || 0), 0);

  const lowStockProducts = products.filter((p) => p.quantity > 0 && p.quantity < 5);

  return {
    totalProducts,
    totalCustomers,
    totalSalesCount,
    totalRevenue,
    lowStockProducts,
  };
}
