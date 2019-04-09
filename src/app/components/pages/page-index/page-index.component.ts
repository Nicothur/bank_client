import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/beans/User';

@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.scss']
})
export class PageIndexComponent implements OnInit {
  public subTitle: string = "";
  
  public tokens: string = "0";
  
  public isConnected: boolean;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subTitle = this.route.snapshot.data['title'];

    this.isConnected = true;

    let user: User = JSON.parse(sessionStorage.getItem("user"));

    this.isConnected = user != null;

    if (this.isConnected) {
      this.tokens = user.tokens.toString();
    }
  }
}
