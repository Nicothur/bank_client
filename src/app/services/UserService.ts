import { User } from '../beans/User';
import { Transaction } from '../beans/Transaction';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor() {
        
    }

    public create(user: User) {
        
    }

    public get(user: User) : User {
        return null;
    }

    public update(user: User, newUser: User) : User {
        return null;
    }

    public send(user: User, trx: Transaction) {
        return null;
    }
}