const formatOrderCreatedEmail = (orderData) => {
  // orderData باید شامل email کاربر باشد
  const itemsList = orderData.items.map((item) => `<li>محصول: ${item.productId} - تعداد: ${item.quantity} - قیمت: ${item.price}</li>`).join("");

  return {
    subject: `تایید سفارش #${orderData.id}`,
    html: `
      <h1>سفارش شما با موفقیت ثبت شد</h1>
      <p>شماره سفارش: <strong>${orderData.id}</strong></p>
      <p>مبلغ کل: ${orderData.totalAmount}</p>
      <h3>اقلام سفارش:</h3>
      <ul>${itemsList}</ul>
      <p>وضعیت فعلی: PENDING</p>
      <hr>
      <p>با تشکر از خرید شما</p>
    `,
  };
};

const formatPaymentSuccessEmail = (paymentData) => {
  return {
    subject: `رسید پرداخت - سفارش #${paymentData.orderId}`,
    html: `
      <h1>پرداخت موفقیت‌آمیز بود</h1>
      <p>مشتری گرامی، پرداخت شما برای سفارش ${paymentData.orderId} تایید شد.</p>
      <p>شماره تراکنش: <strong>${paymentData.transactionId}</strong></p>
      <p>مبلغ پرداختی: ${paymentData.amount}</p>
      <p>وضعیت سفارش شما به زودی به CONFIRMED تغییر خواهد کرد.</p>
    `,
  };
};

module.exports = { formatOrderCreatedEmail, formatPaymentSuccessEmail };
