import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { BlockChainService } from 'src/app/Services/BlockChainService';
import { UserService } from 'src/app/Services/UserService';
@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.scss']
})
export class PageIndexComponent implements OnInit {
  public subTitle: string = "Index";
  
  public isConnected: boolean;

  constructor(private router: Router, private blockChainService: BlockChainService, private userService: UserService) {

  }

  ngOnInit() {
    if(!this.userService.token){
      this.userService.getValideToken();
    }

    this.userService.currentUser = JSON.parse(sessionStorage.getItem("user"));
    
    this.isConnected = this.userService.currentUser != null;

    if (this.isConnected) {
      this.blockChainService.initFirstBlock();
      this.blockChainService.getMyTokenAndTransaction()
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


/*
 * Just for testing
 */


  public async mineBlock(){
    if(this.userService.isMining){
      await this.blockChainService.mineABlock();
    }else{
      console.log("please enable mining on top left of screen")
    }
  }

  public async mineBlockAnReceiveNotTheSameBlock(){
    if(this.userService.isMining){
      this.blockChainService.mineABlock();
      await this.blockChainService.getInterruptedNotBySameBlock();
    }else{
      console.log("please enable mining on top left of screen")
    }
  }

  public async mineBlockAnReceiveTheSameBlock(){
    if(this.userService.isMining){
      this.blockChainService.mineABlock();
      await this.blockChainService.getInterruptedBySameBlock();
    }else{
      console.log("please enable mining on top left of screen")
    }
  }

  public navigate(path: string){
    this.router.navigate([path])
  }
}
