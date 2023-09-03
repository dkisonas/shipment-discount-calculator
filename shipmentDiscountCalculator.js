import { PackageSize, CarrierCode } from "./enums";
import { MAX_DISCOUNT, FREE_SHIPMENT_COUNT } from "./constants";

class ShipmentDiscountCalculator {
  constructor(prices) {
    this.prices = prices;
    this.totalDiscount = 0;
    this.lLpCount = 0;
    this.currentMonth = null;
  }

  processTransactions(transactions) {
    transactions.forEach((transaction) => {
      this.processTransaction(transaction);
    });
  }

  processTransaction(transaction) {
    const date = new Date(transaction.date);
    const month = date.getMonth();

    if (this.currentMonth !== month) {
      this.currentMonth = month;
      this.totalDiscount = 0;
      this.lLpCount = 0;
    }

    const price = this.prices[transaction.carrierCode]?.[transaction.packageSize];

    if (!price) {
      transaction.ignored = true;
      return;
    }

    transaction.finalPrice = price;

    this.rule1(transaction, price);

    this.rule2(transaction, price);

    this.rule3(transaction, price);

    this.totalDiscount += transaction.discount;
  }

  rule3(transaction, price) {
    if (this.totalDiscount + transaction.discount > MAX_DISCOUNT) {
      transaction.discount = MAX_DISCOUNT - this.totalDiscount;
      transaction.finalPrice = price - transaction.discount;
    }
  }

  rule2(transaction, price) {
    if (transaction.packageSize === PackageSize.LARGE && transaction.carrierCode === CarrierCode.LP) {
      this.lLpCount++;
      if (this.lLpCount === FREE_SHIPMENT_COUNT) {
        transaction.discount = price;
        transaction.finalPrice = 0;
      }
    }
  }

  rule1(transaction, price) {
    if (transaction.packageSize === PackageSize.SMALL) {
      const lowestPrice = Math.min(this.prices.LP.S, this.prices.MR.S);
      transaction.discount = price - lowestPrice;
      transaction.finalPrice = price - transaction.discount;
    }
  }
}
export { ShipmentDiscountCalculator };
