const WindowElement = class {
  constructor({ id, type, avaibleOpenings }) {
    this.id = id;
    this._type = type;
    this._opening = null;
    this._avaibleOpenings = avaibleOpenings;
  }

  set opening(value) {
    if (this._avaibleOpenings.indexOf(value) === -1) {
      throw new Error(`${value} is unavaible opening type!`);
    }
    this._opening = value;
  }

  getAvaibleOpenings() {
    return this._avaibleOpenings;
  }

  /**
   * Props unavaible to set
   */

  set avaibleOpenings(value) {
    this._uCantSetThis(value);
  }

  set id(value) {
    this._uCantSetThis(value);
  }

  _uCantSetThis(value) {
    throw new Error(`${value} is nice value, but you can't set this property!`);
  }
};
