const Product = class {
  constructor() {
    this.id = Date.now();
    this.lastUpdate = Date.now();

    return new Proxy(this, {
      set(target, property, value) {
        target[property] = value;
        target._updated();
        return true;
      }
    });
  }

  _updated() {
    this.lastUpdate = Date.now();
  }

  _normalizeNumber(value, thresholds) {
    const min = thresholds.min;
    const max = thresholds.max;

    if (value < min) return min;
    if (value > max) return max;

    return value;
  }
};

export default Product;
