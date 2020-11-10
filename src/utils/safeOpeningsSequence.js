function safeOpeningsSequence(digits) {
  return digits
    .toString()
    .split('')
    .sort()
    .reverse()
    .join('');
}

module.exports = safeOpeningsSequence;
