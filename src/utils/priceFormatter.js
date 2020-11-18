export default number => {
  return number.toFixed(0).replace(/(.)(?=(\d{3})+$)/g, '$1 ');
};
