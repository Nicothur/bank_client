import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/Models/Transaction';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/UserService';
import { PeerService } from 'src/app/services/PeerService';

@Component({
  selector: 'app-page-send',
  templateUrl: './page-send.component.html',
  styleUrls: ['./page-send.component.scss']
})
export class PageSendComponent implements OnInit {
  public subTitle: string = "Send";

  public tokens: string;

  public errorInput: string;

  public error: string;

  public trxModel: Transaction;

  constructor(private router: Router, private userService: UserService, private peerService: PeerService) {

  }

  ngOnInit() {
    if(!this.userService.token){
      this.userService.getValideToken();
    }
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
      
      // this.userService.send(JSON.parse(sessionStorage.getItem("user")), this.trxModel);

      this.router.navigate(["history"]);
    }
  }
}