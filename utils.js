import fs from "fs";
import os from "os";
import { Transaction } from "./transaction";

async function readTransactionsFromFile(filename) {
  const data = await fs.promises.readFile(filename, "utf-8");
  const lines = data.split(os.EOL);
  const transactions = lines.map((line) => {
    const [date, packageSize, carrierCode] = line.split(" ");
    return new Transaction(date, packageSize, carrierCode);
  });
  return transactions;
}

export { readTransactionsFromFile };
