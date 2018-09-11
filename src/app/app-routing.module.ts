import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'bikes',
    children: [
      {
        path: '',
        component: BrowseComponent
      },
      {
        path: 'listings',
        component: ListingsComponent,
        canActivate: [ AuthGuard ]
      }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

