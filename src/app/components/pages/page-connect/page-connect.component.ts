import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/beans/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.scss']
})
export class PageConnectComponent implements OnInit {
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
  }

  public connect(form: NgForm) {
    this.error = "";
    this.errorInput = "";

    let errorRequired: string = "Required";

    if (this.userModel.username == "") {
      this.error = errorRequired;
      this.errorInput = "username";

    } else if (this.userModel.password == "") {
      this.error = errorRequired;
      this.errorInput = "password";

    } else {
      let user: User = new UserService().get(this.userModel);

      if (user == null) {
        this.error = "Unknown user";
        this.errorInput = "username";
        
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));

        this.router.navigate([""]);
      }
    }
  }
}