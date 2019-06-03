import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/UserService';
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

  public currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (!this.userService.token) {
      this.userService.getValideToken();
    }
  }

  public register(form: NgForm) {
    if (!this.firstname || !this.password || !this.email || !this.lastname) {
      return;
    }
    this.userService
      .create(this.firstname,this.lastname, this.email, this.password )
      .subscribe((user: User) => {
        console.log(user);
        this.userService.currentUser = user;
        this.router.navigate(['connect']);
      });
  }

  public goToConnect(){
    this.router.navigate(["connect"])
  }
}
