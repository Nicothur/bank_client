import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/UserService';
import { BlockChainService } from 'src/app/Services/BlockChainService';
import { Block } from 'src/app/Models/Block';

@Component({
  selector: 'app-page-send',
  templateUrl: './page-send.component.html',
  styleUrls: ['./page-send.component.scss']
})
export class PageSendComponent implements OnInit {
  public subTitle: string = "Send";

  public amount: number;

  public accountId: string;


  constructor(private router: Router, public userService: UserService, private blockChainService: BlockChainService) {

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
  }

  public send(form: NgForm) {
    if(this.amount <= 0 || !this.amount || !this.accountId || this.accountId == this.userService.currentUser.accountId){
      console.log("invalide input")
      return;
    }
    
    if(this.amount > this.userService.currentUser.tokens){
      console.log("not enough token")
      return;
    }
    this.userService.checkAccountId(this.accountId)
      .subscribe(async(exists) => {
        if(exists){
          let block: Block = {
            data: {
              amount: this.amount,
              date: new Date(Date.now()),
              receiver: this.accountId,
              sender: this.userService.currentUser.accountId
            },
            hash: "",
            index: 0,
            previousHash: "",
            signature: this.userService.currentUser.hash,
            proofOfWork: ""
          }
          await this.blockChainService.calculateBlock(block);
          console.log(block)
        }else{
          console.log("accounId invalide")
        }
      });
  }

  public goBack(){
    this.router.navigate([""])
  }
}