module.exports = {
  getYear: () => {
    return new Date().getFullYear();
  },
  formatAmount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
};
