import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Data {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Array<Transaction> {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, transaction) =>{
      if(transaction.type === 'income' )
        return acc + transaction.value;

      return acc;
    }, 0);

    const outcome = this.transactions.reduce((acc, transaction) =>{
      if(transaction.type === 'outcome' )
        return acc + transaction.value;

      return acc;
    }, 0);

    const total = income - outcome;
    const balance = { income, outcome, total, };

    return balance;
    
  }

  public create({ title, type, value }: Data): Transaction {

    const transaction = new Transaction({
      title, type, value
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
