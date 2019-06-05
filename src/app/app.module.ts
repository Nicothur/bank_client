import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { MatCardModule, MatDialogModule, MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatTableModule, MatIconModule } from "@angular/material"
import { Routes, RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LabelInputErrorComponent } from './components/labels/label-input-error/label-input-error.component';
import { BlockChainService } from './Services/BlockChainService';
import { UserService } from './Services/UserService';
import { HttpClientModule } from '@angular/common/http';
import { PeerService } from './Services/PeerService';

import { PageIndexComponent } from './components/pages/IndexComponent/page-index.component';
import { PageConnectComponent } from './components/pages/ConnectionComponent/page-connect.component';
import { PageRegisterComponent } from './components/pages/RegisterComponent/page-register.component';
import { PageProfileComponent } from './components/pages/ProfileComponent/page-profile.component';
import { PageHistoryComponent } from './components/pages/HistoryComponent/page-history.component';
import { PageSendComponent } from './components/pages/SendComponent/page-send.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LabelInputErrorComponent,
    PageIndexComponent,
    PageConnectComponent,
    PageRegisterComponent,
    PageProfileComponent,
    PageHistoryComponent,
    PageSendComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    BlockChainService,
    UserService,
    PeerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
