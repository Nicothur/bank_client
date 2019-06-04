import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/UserService';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.scss']
})
export class PageConnectComponent implements OnInit{
  public subTitle: string = "Connection";

  public error: string;
  public errorInput: string;

  public accountid: string;
  public password: string;

  public currentUser: User;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(){
    if(!this.userService.token){
      this.userService.getValideToken();
    }

    sessionStorage.removeItem("user");
  }

  public goToRegister(){
    this.router.navigate(["register"])
  }

  public connect(form: NgForm) {
    this.error = "";
    this.errorInput = "";

    if (this.accountid == "") {
      this.error = "Required";
      this.errorInput = "username";

    } else if (this.password == "") {
      this.error = "Required";
      this.errorInput = "password";
    } else {
      this.userService.login(this.accountid, this.password).subscribe((result: User)=> {
        if(result == null){
          this.error = "Unknown user";
          this.errorInput = "username";
        }
        sessionStorage.setItem("user", JSON.stringify(result));
        this.userService.currentUser = result
        this.userService.currentUser.tokens = 0
        // this.peerServices.connect(this.username, this.password)
        this.router.navigate([""]);
      })
    }
  }

}