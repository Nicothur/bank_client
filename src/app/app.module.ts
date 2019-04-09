import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageIndexComponent } from './components/pages/page-index/page-index.component';
import { PageConnectComponent } from './components/pages/page-connect/page-connect.component';
import { PageRegisterComponent } from './components/pages/page-register/page-register.component';
import { PageProfileComponent } from './components/pages/page-profile/page-profile.component';
import { PageHistoryComponent, TrxStatePipe } from './components/pages/page-history/page-history.component';
import { PageSendComponent } from './components/pages/page-send/page-send.component';
import { LabelInputErrorComponent } from './components/labels/label-input-error/label-input-error.component';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (true) {
      return true;
    } else {
      this.router.navigate(['']);

      return false;
    }
  }
}

const appRoutes: Routes = [
  { path: 'index', component: PageIndexComponent, data: { title: 'Index' } },
  { path: 'connect', component: PageConnectComponent, data: { title: 'Connection' } },
  { path: 'register', component: PageRegisterComponent, data: { title: 'Register' } },
  
  { path: 'profile', canActivate: [AuthGuard], component: PageProfileComponent, data: { title: 'Profile' } },
  { path: 'history', canActivate: [AuthGuard], component: PageHistoryComponent, data: { title: 'History' } },
  { path: 'send', canActivate: [AuthGuard], component: PageSendComponent, data: { title: 'Send' } },
  
  { path: '', component: PageIndexComponent, data: { title: 'Index' } },
  { path: 'not-found', component: PageIndexComponent, data: { title: 'Index' }  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,

    PageIndexComponent,
    PageConnectComponent,
    PageRegisterComponent,
    PageProfileComponent,
    PageHistoryComponent,
    PageSendComponent,

    LabelInputErrorComponent,
    
    TrxStatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
  
}
