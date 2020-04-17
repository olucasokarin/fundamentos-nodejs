import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface Data {
  title: string;
  type: 'income' | 'outcome';
  value: number;
    
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value}: Data): Transaction {

    const {total} = this.transactionsRepository.getBalance();

    if(type === 'outcome' && value > total)
      throw Error('Valor extrapola o total')


    const transaction = this.transactionsRepository.create({ title, type, value });

    return transaction;
  }
}

export default CreateTransactionService;
