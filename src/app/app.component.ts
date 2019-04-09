import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './beans/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public isConnected: boolean;

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    this.isConnected = JSON.parse(sessionStorage.getItem("user")) != null;
  }

  public logout() {
    sessionStorage.removeItem("user");
    
    this.router.navigate([""]);
  }
}