const output = orders.map(order => {
  const totalAmount = order.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return {
    orderId: order.orderId,
    customerName: order.customer.name,
    city: order.customer.location.city,
    totalAmount
  };
});

console.log(output);
