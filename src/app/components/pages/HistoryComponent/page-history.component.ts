import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/Models/Transaction';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/UserService';

@Component({
  selector: 'app-page-history',
  templateUrl: './page-history.component.html',
  styleUrls: ['./page-history.component.scss']
})
export class PageHistoryComponent implements OnInit {
  public subTitle: string = "History";

  public isSendedTable: boolean;

  public transactions: Transaction[];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    if(!this.userService.token){
      this.userService.getValideToken();
    }
    this.isSendedTable = true;

    this.transactions = (JSON.parse(sessionStorage.getItem("user")) as User).transactions;

  }

  public switchTable() {
    this.isSendedTable = !this.isSendedTable;
  }
}