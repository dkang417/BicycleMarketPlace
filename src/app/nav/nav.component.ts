import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'Bicycle Marketplace';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  loggedIn: boolean;

  ngOnInit() {
    this.auth.authorized$.subscribe(authed => (this.loggedIn = authed));
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}

