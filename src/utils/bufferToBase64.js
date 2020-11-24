const bufferToBase64 = buffer => {
  const binString = Array.prototype.map
    .call(buffer, function(ch) {
      return String.fromCharCode(ch);
    })
    .join('');

  return window.btoa(binString);
};

export default bufferToBase64;
