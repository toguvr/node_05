import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface CreateTransactionDTO {
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
    const incomeFiltered = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomeFiltered = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = incomeFiltered.reduce(function (acumulador, valorAtual) {
      return acumulador + valorAtual.value;
    }, 0);

    const outcome = outcomeFiltered.reduce(function (acumulador, valorAtual) {
      return acumulador + valorAtual.value;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
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
