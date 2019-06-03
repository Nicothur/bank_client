import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageIndexComponent } from './components/pages/IndexComponent/page-index.component';
import { PageConnectComponent } from './components/pages/ConnectionComponent/page-connect.component';
import { PageRegisterComponent } from './components/pages/RegisterComponent/page-register.component';
import { PageProfileComponent } from './components/pages/ProfileComponent/page-profile.component';
import { PageHistoryComponent } from './components/pages/HistoryComponent/page-history.component';
import { PageSendComponent } from './components/pages/SendComponent/page-send.component';

const routes: Routes = [
  { path: 'index', component: PageIndexComponent },
  {
    path: 'connect',
    component: PageConnectComponent
  },
  {
    path: 'register',
    component: PageRegisterComponent,
  },

  {
    path: 'profile',
    component: PageProfileComponent,
  },
  {
    path: 'history',
    component: PageHistoryComponent
  },
  { path: 'send', component: PageSendComponent },

  { path: '', component: PageIndexComponent},
  {
    path: 'not-found',
    component: PageIndexComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
