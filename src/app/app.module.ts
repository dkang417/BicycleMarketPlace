import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as fromShared from './shared';

import { BrowseComponent } from './browse/browse.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './dashboard/login/login.component';
import { RandombikeComponent } from './dashboard/randombike/randombike.component';
import { RegisterComponent } from './dashboard/register/register.component';
import { ListingsComponent } from './listings/listings.component';
import { NavComponent } from './nav/nav.component';

import { AuthGuard } from './auth.guard';
import { TitleizePipe } from './shared/pipes';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  declarations: [
    ...fromShared.declarations,
    AppComponent,
    BrowseComponent,
    DashboardComponent,
    LoginComponent,
    RandombikeComponent,
    RegisterComponent,
    ListingsComponent,
    NavComponent,
    TitleizePipe,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot()
  ],
  providers: [
    ...fromShared.providers,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
