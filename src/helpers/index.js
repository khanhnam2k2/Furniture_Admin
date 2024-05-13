export const formatCurrency = (amount) => {
  if (typeof amount === "string") {
    const numericPrice = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
    return numericPrice.toLocaleString("vi-VN");
  } else {
    return amount.toLocaleString("vi-VN");
  }
};
