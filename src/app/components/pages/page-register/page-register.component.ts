import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/beans/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {
  public subTitle: string = "";

  public errorInput: string;

  public error: string;

  public userModel: User = new User();

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.subTitle = this.route.snapshot.data['title'];
    
    this.userModel.username = "";
    this.userModel.password = "";
    this.userModel.passwordConfirm = "";
  }

  public register(form: NgForm) {
    let userService = new UserService();

    this.error = "";
    this.errorInput = "";

    let errorRequired: string = "Required";

    if (this.userModel.username == "") {
      this.error = errorRequired;
      this.errorInput = "username";

    } else if (this.userModel.password == "") {
      this.error = errorRequired;
      this.errorInput = "password";

    } else if (this.userModel.passwordConfirm == "") {
      this.error = errorRequired;
      this.errorInput = "passwordConfirm";

    } else if (this.userModel.password != this.userModel.passwordConfirm) {
      this.error = "Confirm password is not the same";
      this.errorInput = "passwordConfirm";

    } else {
      let userVerif = new User();
      userVerif.username = this.userModel.username;

      if (userService.get(userVerif) != null) {
        this.error = "username";
        this.errorInput = "Username already taken";
      } else {
        userService.create(this.userModel);

        sessionStorage.setItem("user", JSON.stringify(userService.get(this.userModel)));

        this.router.navigate([""]);
      }
    }
  }
}