import { User } from '../Models/User';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '../Models/Token';
import * as shajs from 'sha.js';
import { BlockChainService } from './BlockChainService';
import { Transaction } from '../Models/Transaction';

@Injectable()
export class UserService {
  public token: Token;
  public currentUser: User;
  public isMining: boolean;

  constructor(private http: HttpClient) {}

  public login(id, password): Observable<any> {
    let body = {
      AccountId: '' + id,
      Password: shajs('sha256')
        .update(password)
        .digest('hex')
    };
    let headers = {
      Authorization: 'Bearer ' + this.token.token
    };
    return this.http.post('https://supbank-api.azurewebsites.net/Login', body, {
      headers: headers
    });
  }

  public getValideToken(): void {
    let body = {
      SecretId: '25w6GVcUp6',
      SecretPass: 'ez3rymWV8k6662UxV83WB7V4Y36hYR6iUjhc3B7T5F6RU'
    };
    this.http
      .post('https://supbank-api.azurewebsites.net/Auth', body)
      .subscribe((result: Token) => {
        this.token = result;
      });
  }

  public create(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<User> {
    let body = {
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      Password: shajs('sha256')
        .update(password)
        .digest('hex')
    };
    let headers = {
      Authorization: 'Bearer ' + this.token.token
    };
    return this.http.post<User>(
      'https://supbank-api.azurewebsites.net/Register',
      body,
      { headers: headers }
    );
  }
}
