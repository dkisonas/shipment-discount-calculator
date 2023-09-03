class Transaction {
  constructor(date, packageSize, carrierCode) {
    this.date = date;
    this.packageSize = packageSize;
    this.carrierCode = carrierCode;
    this.finalPrice = null;
    this.discount = 0;
    this.ignored = false;
  }

  toString() {
    if (this.ignored) {
      return `${this.date} ${this.packageSize ?? ""} ${this.carrierCode ?? ""}Ignored`;
    }
    return `${this.date} ${this.packageSize} ${this.carrierCode} ${this.finalPrice.toFixed(2)} ${this.discount === 0 ? "-" : this.discount.toFixed(2)}`;
  }
}

export { Transaction };
