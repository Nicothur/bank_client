import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/beans/Transaction';
import { User } from 'src/app/beans/User';

@Pipe({name: 'trxState'})
export class TrxStatePipe implements PipeTransform {
  transform(transactions: Transaction[], state: boolean): Transaction[] {
    return transactions.filter(object => {
      return object.sended == state;
    });
  }
}

@Component({
  selector: 'app-page-history',
  templateUrl: './page-history.component.html',
  styleUrls: ['./page-history.component.scss']
})
export class PageHistoryComponent implements OnInit {
  public subTitle: string = "";

  public isSendedTable: boolean;

  public transactions: Transaction[];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subTitle = this.route.snapshot.data['title'];

    this.isSendedTable = true;

    this.transactions = (JSON.parse(sessionStorage.getItem("user")) as User).transactions;

  }

  public switchTable() {
    this.isSendedTable = !this.isSendedTable;
  }
}