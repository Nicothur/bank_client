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

  public informationMessage: string;

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
      this.informationMessage = "Invalide inputs"
      setTimeout(() => {
        this.informationMessage = undefined
      }, 4000)
      return;
    }
    
    if(this.amount > this.userService.currentUser.tokens){
      this.informationMessage = "Not enough token"
      setTimeout(() => {
        this.informationMessage = undefined
      }, 4000)
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
          this.blockChainService.sendForMining(block)
          this.router.navigate([""])
        }else{
          this.informationMessage = "Invalide ID"
          setTimeout(() => {
            this.informationMessage = undefined
          }, 4000)
        }
      });
  }

  public goBack(){
    this.router.navigate([""])
  }
}