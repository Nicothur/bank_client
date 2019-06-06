import { Component, OnInit, Pipe, PipeTransform, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/Models/Transaction';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/UserService';
import { BlockChainService } from 'src/app/Services/BlockChainService';
import { MatTableDataSource } from '@angular/material';

export interface transact {
  amount: number;
  id: string;
  date: string;
}

@Component({
  selector: 'app-page-history',
  templateUrl: './page-history.component.html',
  styleUrls: ['./page-history.component.scss']
})
export class PageHistoryComponent implements OnInit {
  public subTitle: string = "History";

  public isSendedTable: boolean = true;

  public sended: transact[] = []; 
  public received: transact[] = [];

  public displayedColumns: string[] = ['amount', 'id', 'date'];
  public dataSource: MatTableDataSource<transact>;

  constructor(private router: Router, private userService: UserService, private blockChainService: BlockChainService) {
  }

  ngOnInit() {
    if(!this.userService.token){
      this.userService.getValideToken();
    }

    this.userService.currentUser = JSON.parse(sessionStorage.getItem("user"));
    if(!this.userService.currentUser){
      this.router.navigate([""])
      return;
    }

    this.blockChainService.getMyTokenAndTransaction()
    
    this.userService.currentUser.transactions.forEach(transaction => {
      if(transaction.receiver == this.userService.currentUser.accountId){
        this.received.push({
          amount: transaction.amount,
          date: typeof transaction.date == "string" ? new Date(transaction.date).toUTCString() : transaction.date.toUTCString(),
          id: transaction.sender,
        })
      }else{
        this.sended.push({
          amount: transaction.amount,
          date: typeof transaction.date == "string" ? new Date(transaction.date).toUTCString() : transaction.date.toUTCString(),
          id: transaction.receiver,
        })
      }
    });
    this.dataSource = new MatTableDataSource(this.sended)
  }

  public switchTable() {
    this.isSendedTable = !this.isSendedTable;
    if(this.isSendedTable){
      this.dataSource.data = this.sended
    }else{
      this.dataSource.data = this.received
    }
  }

  public goBack(){
    this.router.navigate([""])
  }
}