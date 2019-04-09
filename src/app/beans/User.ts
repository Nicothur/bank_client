import { Transaction } from './Transaction';

export class User {
    username: string;

    password: string;
    passwordNew: string;
    passwordConfirm: string;

    address: string;
    tokens: number;
    transactions: Transaction[];
}