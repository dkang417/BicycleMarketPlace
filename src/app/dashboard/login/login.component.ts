import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services';
import { User } from '../../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errors: string[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(user: User): void {
    console.log('logging in user', user);
    this.auth.login(user).subscribe(() => this.router.navigateByUrl('bikes'));
  }
  private handleErrors(errors: string[] | Error): void {
    this.errors = Array.isArray(errors) ? errors : [errors.message];
  }

}

