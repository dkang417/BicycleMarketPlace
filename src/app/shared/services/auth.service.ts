import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = '/api/auth/';
  authorized$ = new BehaviorSubject(this.isAuthed());


  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) { }

  login(user: User): Observable<User> {
    return this.http
      .post<User>(this.base + 'login', user)
      .pipe(tap(() => this.authorized$.next(this.isAuthed())));
  }

  register(user: User): Observable<User> {
    return this.http
      .post<User>(this.base + 'register', user)
      .pipe(tap(() => this.authorized$.next(this.isAuthed())));
  }

  logout(): Observable<boolean> {
    console.log('logging out');
    return this.http.delete<boolean>(this.base + 'logout').pipe(
      tap(() => this.cookieService.removeAll()),
      tap(() => this.authorized$.next(false))
    );
  }

  isAuthed(): boolean {
    const expired = parseInt(this.cookieService.get('expiration'), 10);
    const userID = this.cookieService.get('userID');
    const session = this.cookieService.get('session');

    return expired && userID && session && expired > Date.now();
  }

  getUserId(): string {
    return this.cookieService.get('userID');
  }

// get the bikes owner using ownerid
  getContact(ownerId: string): Observable<User> {
    return this.http.get<User>(this.base + '/getcontact/' + ownerId);
  }

}

