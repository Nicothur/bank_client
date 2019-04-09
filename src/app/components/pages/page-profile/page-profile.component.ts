import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/beans/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  public subTitle: string = "";

  public address: string;

  public errorInput: string;

  public error: string;

  public userModel: User = new User();

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.subTitle = this.route.snapshot.data['title'];

    let user: User = JSON.parse(sessionStorage.getItem("user"));

    this.address = user.address;
    this.userModel.username = user.username;

    this.userModel.password = "";
    this.userModel.passwordNew = "";
    this.userModel.passwordConfirm = "";
  }

  public edit(form: NgForm) {
    this.error = "";
    this.errorInput = "";

    let errorRequired: string = "Required";

    if (this.userModel.password == "") {
      this.error = errorRequired;
      this.errorInput = "password";

    } else if (this.userModel.passwordNew == "") {
      this.error = errorRequired;
      this.errorInput = "passwordNew";

    } else if (this.userModel.passwordConfirm == "") {
      this.error = errorRequired;
      this.errorInput = "passwordConfirm";

    } else if (this.userModel.password == this.userModel.passwordNew) {
      this.error = "New password should be different";
      this.errorInput = "passwordNew";

    } else if (this.userModel.passwordNew != this.userModel.passwordConfirm) {
      this.error = "Confirm password is not the same";
      this.errorInput = "passwordConfirm";

    } else {
      let user: User = JSON.parse(sessionStorage.getItem("user"));

      sessionStorage.setItem("user", JSON.stringify(new UserService().update(user, this.userModel)));

      this.router.navigate([""]);
    }
  }
}