import { Transaction } from './Transaction';

export interface User{

    email: string;
    firstname: string;
    lastname: string;

    accountId: string;
    hash: string;
    id: string;

    tokens: number;
    transactions: Transaction[];
}