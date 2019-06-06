import { Component, OnInit, isDevMode, EventEmitter, Self, AfterViewInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { BlockChainService } from 'src/app/Services/BlockChainService';
import { UserService } from 'src/app/Services/UserService';
import { of, TimeInterval } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.scss']
})
export class PageIndexComponent implements OnInit {
  public subTitle: string = "Index";
  
  public childEvent = new EventEmitter();

  public isConnected: boolean;
  public isTestingBlockChain: boolean;
  public myData: string;
  public error: string;
  public inputData: string;
  public connectionEstablished: boolean = false;

  constructor(private router: Router, private blockChainService: BlockChainService, private userService: UserService) {
    if(sessionStorage.getItem("connected")){
      this.connectionEstablished = true
    }
  }

  ngOnInit() {
    this.isTestingBlockChain = !isDevMode();
  
    if(!this.userService.token){
      this.userService.getValideToken();
    }

    this.userService.currentUser = JSON.parse(sessionStorage.getItem("user"));
    
    this.isConnected = this.userService.currentUser != null;

    if (this.isConnected) {

      this.blockChainService.initFirstBlock();
      this.blockChainService.getMyTokenAndTransaction()
      if(!this.userService.peer){
        this.userService.peer = new SimplePeer({ 
          initiator: location.hash === "#init",
          trickle: false
        })
  
        this.userService.peer.on('signal', data => {
          if(data.type){
            this.myData = JSON.stringify(data)
          }
        })
  
        this.userService.peer.on("connect", async(data) => {
          console.log("connected")
          this.blockChainService.askBlockChain()
        })
  
        this.userService.peer.on('data', (data) => {
          this.blockChainService.manageEnteringMessage(""+data)
        })
      }
    }
  }


  public connect(){
    this.userService.peer.signal(JSON.parse(this.inputData))
  }


  public logout() {
    sessionStorage.removeItem("user");
    this.router.navigate([""]);
    document.location.reload();
  }


  public navigate(path: string){
    this.router.navigate([path])
  }


/*
 * Just for testing
 */

  public async mineBlock(){
    if(this.userService.isMining){
      await this.blockChainService.mineABlock();
      console.log(this.blockChainService.blockChain)
    }else{
      this.error = "Please enable mining"
      setTimeout(() => {
        this.error = undefined
      }, 4000)
    }
  }

  public async mineBlockAnReceiveNotTheSameBlock(){
    if(this.userService.isMining){
      this.blockChainService.mineABlock();
      await this.blockChainService.getInterruptedNotBySameBlock();
      console.log(this.blockChainService.blockChain)
    }else{
      this.error = "Please enable mining"
      setTimeout(() => {
        this.error = undefined
      }, 4000)
    }
  }

  public async mineBlockAnReceiveTheSameBlock(){
    if(this.userService.isMining){
      this.blockChainService.mineABlock();
      await this.blockChainService.getInterruptedBySameBlock();
      console.log(this.blockChainService.blockChain)
    }else{
      this.error = "Please enable mining"
      setTimeout(() => {
        this.error = undefined
      }, 4000)
    }
  }

  
}
