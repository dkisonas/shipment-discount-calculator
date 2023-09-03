import { readTransactionsFromFile } from "./utils";
import { ShipmentDiscountCalculator } from "./shipmentDiscountCalculator";
import { prices } from "./config";

async function main() {
  const transactions = await readTransactionsFromFile("input.txt");
  const calculator = new ShipmentDiscountCalculator(prices);
  calculator.processTransactions(transactions);
  for (const transaction of transactions) {
    console.log(transaction.toString());
  }
}

main();
