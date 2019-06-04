import { Transaction } from './Transaction';

export interface Block{
    index: number;
    data: Transaction;
    signature: string;
    proofOfWork: string;
    hash: string;
    previousHash: string;
}