export const calculateAnnuity = (amount: number, type: number) => {
  const credMonth = Math.round(365 / 30);
  const credBody = amount / credMonth;
  const payment = [];

  if (type === 2) {
    for (let i = 0; i < credMonth; i++) {
      payment.push({
        pay: ((((amount - credBody * i) * 0.05) / 365) * 30 + credBody).toFixed(
          2
        ),
        date: new Date(new Date().setMonth(new Date().getMonth() + i)),
      });
    }
  } else {
    const i = 0.05 / 12;
    const n = credMonth;
    const K = (i * Math.pow(i + 1, n)) / (Math.pow(1 + i, n) - 1);
    const A = amount * K;

    for (let i = 0; i <= credMonth; i++) {
      payment.push({
        pay: A,
        date: new Date(new Date().setMonth(new Date().getMonth() + i)),
      });
    }
  }

  return payment;
};
