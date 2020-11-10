let resizeTimeout;

const resizeEnd = () => {
  window.dispatchEvent(new Event('resizeEnd', {}));
};

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeEnd, 500);
});
