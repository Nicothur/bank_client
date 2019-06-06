import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/UserService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {
  public subTitle: string = 'Register';

  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public informationMessage: string;

  public currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (!this.userService.token) {
      this.userService.getValideToken();
    }
    sessionStorage.removeItem("user")
  }

  public register(form: NgForm) {
    if (!this.firstname || !this.password || !this.email || !this.lastname) {
      this.informationMessage = "Invalide inputs"
      setTimeout(()=>{
        this.informationMessage = undefined
      }, 4000)
      return;
    }
    this.userService
      .create(this.firstname,this.lastname, this.email, this.password )
      .subscribe((user: User) => {
        this.userService.login(user.accountId, this.password).subscribe((result: User)=> {
          sessionStorage.setItem("user", JSON.stringify(result));
          this.userService.currentUser = result
          this.userService.currentUser.tokens = 0
          this.router.navigate([""]);
        })
      }, (data) => {
        console.log(data)
        this.informationMessage = data.error.reason
        setTimeout(()=>{
          this.informationMessage = undefined
        }, 4000)
      });
  }

  public goToConnect(){
    this.router.navigate(["connect"])
  }
}
