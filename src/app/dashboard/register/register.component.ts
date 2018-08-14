import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services';
import { User } from '../../user';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  registrationErrors: string[] = [];


  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(user: User): void {
    this.auth.register(user).subscribe(
      () => {
        this.router.navigateByUrl('bikes');
      },
      error => {
        console.log(error);
      }
    );
  }

}
