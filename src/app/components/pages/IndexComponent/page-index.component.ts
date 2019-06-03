import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { BlockChainService } from 'src/app/services/BlockChainService';
import { UserService } from 'src/app/services/UserService';
@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.scss']
})
export class PageIndexComponent implements OnInit {
  public subTitle: string = "Index";
  
  public tokens: number = 0;
  public isMining: boolean;
  
  public isConnected: boolean;

  constructor(private router: Router, private blockChainService: BlockChainService, private userService: UserService) {

  }

  ngOnInit() {
    if(!this.userService.token){
      this.userService.getValideToken();
    }

    this.isConnected = JSON.parse(sessionStorage.getItem("user")) != null;

    if (this.isConnected) {
      this.userService.isMining = false;
      this.blockChainService.initFirstBlock();
      console.log(this.blockChainService.blockChain)
      // this.tokens = user.tokens;
    }
  }

  public logout() {
    sessionStorage.removeItem("user");
    this.router.navigate([""]);
    document.location.reload();
  }

  public goToConnect(){
    this.router.navigate(["connect"])
  }

  public goToRegister(){
    this.router.navigate(["register"])
  }

  public mineBlock(){
    console.log("i'm minig")
  }
}
