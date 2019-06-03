import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  public subTitle: string = "Profile";

  public address: string;

  public errorInput: string;

  public error: string;

  public userModel: User;
  public passwordNew: string;
  public passwordConfirm: string;

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    if(!this.userService.token){
      this.userService.getValideToken();
    }
    let user: User = JSON.parse(sessionStorage.getItem("user"));

    this.userModel.accountId = user.accountId;

  }

  public edit(form: NgForm) {
    // this.error = "";
    // this.errorInput = "";

    // let errorRequired: string = "Required";

    // if (this.userModel.password == "") {
    //   this.error = errorRequired;
    //   this.errorInput = "password";

    // } else if (this.passwordNew == "") {
    //   this.error = errorRequired;
    //   this.errorInput = "passwordNew";

    // } else if (this.passwordConfirm == "") {
    //   this.error = errorRequired;
    //   this.errorInput = "passwordConfirm";

    // } else if (this.userModel.password == this.passwordNew) {
    //   this.error = "New password should be different";
    //   this.errorInput = "passwordNew";

    // } else if (this.passwordNew != this.passwordConfirm) {
    //   this.error = "Confirm password is not the same";
    //   this.errorInput = "passwordConfirm";

    // } else {
    //   let user: User = JSON.parse(sessionStorage.getItem("user"));

    //   sessionStorage.setItem("user", JSON.stringify(this.userService.update(user, this.userModel)));

    //   this.router.navigate([""]);
    // }
  }
}