import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/beans/Transaction';
import { User } from 'src/app/beans/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-page-send',
  templateUrl: './page-send.component.html',
  styleUrls: ['./page-send.component.scss']
})
export class PageSendComponent implements OnInit {
  public subTitle: string = "";

  public tokens: string;

  public errorInput: string;

  public error: string;

  public trxModel: Transaction = new Transaction();

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.subTitle = this.route.snapshot.data['title'];

    this.tokens = (JSON.parse(sessionStorage.getItem("user")) as User).tokens.toString();

    this.trxModel.address = "";
  }

  public send(form: NgForm) {
    this.error = "";
    this.errorInput = "";

    let errorRequired: string = "Required";

    if (this.trxModel.amount == null) {
      this.error = errorRequired;
      this.errorInput = "amount";

    } else if (this.trxModel.amount <= 0) {
      this.error = "Should be > 0";
      this.errorInput = "amount";

    } else if (this.trxModel.address == "") {
      this.error = errorRequired;
      this.errorInput = "address";

    } else {
      this.trxModel.date = new Date();
      
      new UserService().send(JSON.parse(sessionStorage.getItem("user")), this.trxModel);

      this.router.navigate(["history"]);
    }
  }
}