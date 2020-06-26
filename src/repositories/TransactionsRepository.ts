import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // const balance = this.transactions.reduce((income,outcome)=>)

    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((prevVal, record) => prevVal + record.value, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((prevVal, record) => prevVal + record.value, 0);

    const balance = { income, outcome, total: income - outcome };
    console.log(balance);
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
