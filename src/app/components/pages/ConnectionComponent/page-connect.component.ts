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

  public navigate(path){
    this.router.navigate([path])
  }

  public connect(form: NgForm) {

    if (this.accountid == "" || this.accountid == undefined) {
      this.error = "Account required";
    } else if (this.password == "" || this.password == undefined) {
      this.error = "Password required";
    } else {
      this.userService.login(this.accountid, this.password).subscribe((result: User)=> {
        sessionStorage.setItem("user", JSON.stringify(result));
        this.userService.currentUser = result
        this.userService.currentUser.tokens = 0
        this.router.navigate([""]);
      }, (err) => {
        this.error = "Unknown user";
        setTimeout(() => {
          this.error = undefined
        }, 4000)
      })
    }
    if(this.error){
      setTimeout(() => {
        this.error = undefined
      }, 4000)
    }
  }

}