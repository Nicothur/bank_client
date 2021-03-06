import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/UserService';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  public subTitle: string = "Profile";

  public isConnected: boolean;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
    if(!this.userService.token){
      this.userService.getValideToken();
    }
    this.userService.currentUser = JSON.parse(sessionStorage.getItem("user"));
    if(!this.userService.currentUser){
      this.router.navigate([""])
      return;
    }
    this.isConnected = true
  }

  public goBack(){
    this.router.navigate([""])
  }
}