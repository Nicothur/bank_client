import { Component, OnInit, isDevMode, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BlockChainService } from 'src/app/Services/BlockChainService';
import { UserService } from 'src/app/Services/UserService';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.scss']
})
export class PageIndexComponent implements OnInit {
  public subTitle: string = "Index";
  
  public peer: any;
  public childEvent = new EventEmitter();

  public isConnected: boolean;
  public isTestingBlockChain: boolean;

  

  constructor(private router: Router, private blockChainService: BlockChainService, private userService: UserService) {}

  ngOnInit() {
    this.isTestingBlockChain = isDevMode();
  
    if(!this.userService.token){
      this.userService.getValideToken();
    }

    this.userService.currentUser = JSON.parse(sessionStorage.getItem("user"));
    
    this.isConnected = this.userService.currentUser != null;

    if (this.isConnected) {
      this.blockChainService.initFirstBlock();
      this.blockChainService.getMyTokenAndTransaction()

      let peer = new SimplePeer ({
        initiator: true
      })
      
      peer.on('signal', function(data) {
        const req = new XMLHttpRequest();
        req.open("POST","http://localhost:8080/join")
        let accountId = JSON.parse(sessionStorage.getItem("user")).accountId
        req.send(JSON.stringify({accountId: accountId, connectionString: data}))
      })
      
      peer.on('data', function(data) {
        console.log('Recieved message:' + data);
      })
    }
  }

  public logout() {
    sessionStorage.removeItem("user");
    this.router.navigate([""]);
    document.location.reload();
  }

  connect() {
    // this.peer.signal(JSON.parse(this.targetpeer));
  }
  
  message() {
    this.peer.send('Hello world');
  }

  public async receiveNewBlockChain(blockChain: Object){
    let lengthNewBlockChain = 0;
    let lengthMyBlockChain = 0;
    for(let element in blockChain){
      lengthNewBlockChain++;
    }
    for(let element in this.blockChainService.blockChain){
      lengthMyBlockChain++;
    }
    if(lengthNewBlockChain > lengthMyBlockChain){
      this.blockChainService.blockChain = blockChain
      if(this.blockChainService.currentMinedBlock != null){
        this.blockChainService.orderToRehash = true;
      }
    }
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
      console.log("please enable mining on top left of screen")
    }
  }

  public async mineBlockAnReceiveNotTheSameBlock(){
    if(this.userService.isMining){
      this.blockChainService.mineABlock();
      await this.blockChainService.getInterruptedNotBySameBlock();
      console.log(this.blockChainService.blockChain)
    }else{
      console.log("please enable mining on top left of screen")
    }
  }

  public async mineBlockAnReceiveTheSameBlock(){
    if(this.userService.isMining){
      this.blockChainService.mineABlock();
      await this.blockChainService.getInterruptedBySameBlock();
      console.log(this.blockChainService.blockChain)
    }else{
      console.log("please enable mining on top left of screen")
    }
  }

  
}
