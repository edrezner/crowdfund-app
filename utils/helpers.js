module.exports = {
  getYear: () => {
    return new Date().getFullYear();
  },
  formatAmount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
  formatDate: (date) => {
    return date.toLocaleString();
  },
  formatPercent: (value) => {
    return `${value}%`;
  },
};
